import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private notFoundUser(user: User): void {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  private notRowsAffected(result: number): void {
    if (result == 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  private notNumberForId(id: number): void {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  }
  private notValidEmail(userFound: User): void {
    if (!userFound) {
      throw new HttpException(
        'User Not Found: The specified email does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (userFound) {
      throw new HttpException(
        'This Email is already in use',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  async getUsers() {
    return await this.userRepository.find();
  }
  async getUserById(id: number) {
    this.notNumberForId(id);
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    this.notFoundUser(userFound);
    return userFound;
  }
  async getUserByEmail(email: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    this.notValidEmail(userFound);
    return userFound;
  }
  async deleteUserById(id: number) {
    this.notNumberForId(id);
    const result = await this.userRepository.delete({ id });
    this.notRowsAffected(result.affected);
    return result;
  }
  async deleteUserByEmail(email: string) {
    const userFound: User = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    this.notValidEmail(userFound);
    const result = await this.userRepository.delete(userFound.id);
    this.notRowsAffected(result.affected);
    return result;
  }
  async updateUserById(id: number, user: UpdateUserDto) {
    this.notNumberForId(id);
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    this.notFoundUser(userFound);

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }
  async updateUserEmail(email: string, user: UpdateUserDto) {
    const userFound: User = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!userFound) {
      throw new HttpException(
        'User Not Found: The specified email does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }
}
