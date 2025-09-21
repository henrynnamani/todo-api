import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { DB_CONNECTION_ERROR } from 'src/common/system-message';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async checkUserExistById(id: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async checkUserExistByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });
      return user;
    } catch (err) {
      throw new NotFoundException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }
}
