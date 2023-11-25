import { Injectable } from '@nestjs/common';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRerpository: Repository<User>,
  ) {}
  createUser(user: CreateUserDto) {
    const newUser = this.userRerpository.create(user);
    return this.userRerpository.save(newUser);
  }
  getUsers() {
    return this.userRerpository.find();
  }
  getUserById(id: number) {
    return this.userRerpository.findOne({
      where: {
        id,
      },
    });
  }
  getUserByEmail(email: string) {
    return this.userRerpository.findOne({
      where: {
        email,
      },
    });
  }
  deleteUserById(id: number) {
    return this.userRerpository.delete({ id });
  }
  updateUser(id: number, user: UpdateUserDto) {
    return this.userRerpository.update({ id }, user);
  }
}
