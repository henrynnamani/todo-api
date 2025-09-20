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
      mockUserRepository.save.mockRejectedValue(new Error(DB_CONNECTION_ERROR));

      try {
        await userService.createUser(createUserDto);
      } catch (err) {
        expect(err).toBeInstanceOf(RequestTimeoutException);
        expect(err.message).toBe(DB_CONNECTION_ERROR);
        expect(err.getResponse().description).toBe(DB_CONNECTION_ERROR);
      }
    });
  });

  describe('checkUserExistById', () => {
    it('should return a user if found by id', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await userService.checkUserExistById('1');
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if user is not found by id', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await userService.checkUserExistById('1');

      expect(result).toBeInstanceOf(NotFoundException);
    });

    it('should throw RequestTimeoutException on database error', async () => {
      mockUserRepository.findOne.mockRejectedValue(
        new Error(DB_CONNECTION_ERROR),
      );

      const result = await userService.checkUserExistById('1');
      expect(result).toBeInstanceOf(RequestTimeoutException);
      expect(result).toBe(DB_CONNECTION_ERROR);
    });
  });

  describe('checkUserExistByEmail', () => {
    it('should return a user if found by email', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result =
        await userService.checkUserExistByEmail('test@example.com');
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should throw NotFoundException if user is not found by email', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result =
        await userService.checkUserExistByEmail('test@example.com');
      expect(result).toBeInstanceOf(NotFoundException);
    });

    it('should throw RequestTimeoutException on database error', async () => {
      mockUserRepository.findOne.mockRejectedValue(
        new Error(DB_CONNECTION_ERROR),
      );

      try {
        await userService.checkUserExistByEmail('test@example.com');
      } catch (err) {
        expect(err).toBeInstanceOf(RequestTimeoutException);
        expect(err.message).toBe(DB_CONNECTION_ERROR);
        expect(err.getResponse().description).toBe(DB_CONNECTION_ERROR);
      }
    });
  });
});
