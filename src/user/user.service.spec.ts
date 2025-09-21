import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './model/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { DB_CONNECTION_ERROR } from 'src/common/system-message';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    it('should successfully create a new user', async () => {
      const createUserDto = {
        name: 'Henry',
        email: 'test@example.com',
        password: 'password123',
      };
      const user = { id: '1', ...createUserDto };

      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      const result = await userService.createUser(createUserDto);

      expect(result).toEqual(user);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw RequestTimeoutException on database error', async () => {
      const createUserDto = {
        name: 'Henry',
        email: 'test@example.com',
        password: 'password123',
      };

      mockUserRepository.save.mockRejectedValue(
        new RequestTimeoutException(DB_CONNECTION_ERROR),
      );

      try {
        await userService.createUser(createUserDto);
      } catch (err) {
        expect(err).toBeInstanceOf(RequestTimeoutException);
        expect(err.message).toBe(DB_CONNECTION_ERROR);
      }
    });
  });

  describe('check user exist by id', () => {
    it('should return user', async () => {
      const id = '1';
      const user = {
        id: '1',
        email: 'hoyx0101@gmail.com',
        password: 'Pyr@hornet0101',
      };

      mockUserRepository.findOneOrFail.mockResolvedValue(user);

      const result = await userService.checkUserExistById(id);

      expect(result).toBe(user);
    });

    it('should return NotFoundException if user does not exist', async () => {
      mockUserRepository.findOneOrFail.mockResolvedValue(null);
      const id = '1';

      try {
        await userService.checkUserExistById(id);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
