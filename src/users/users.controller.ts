import {
  Controller,
  Param,
  Post,
  Patch,
  Body,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/user.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get(':idOrEmail')
  async getUser(
    @Param('idOrEmail') idOrEmail: string,
    @Query('byId') byId: boolean = false,
  ): Promise<User> {
    try {
      let user: User;

      if (byId) {
        const id = parseInt(idOrEmail, 10);

        if (isNaN(id)) {
          throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }

        user = await this.userService.getUserById(id);
      } else {
        const lowercaseEmail = idOrEmail.toLowerCase();
        user = await this.userService.getUserByEmail(lowercaseEmail);
      }

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(newUser);
  }

  @Delete(':idOrEmail')
  async deleteUser(
    @Param('idOrEmail') idOrEmail: string,
    @Query('byId') byId: boolean = false,
  ) {
    try {
      let user: User;
      if (byId) {
        const id = parseInt(idOrEmail, 10);

        if (isNaN(id)) {
          throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        if (this.userService.getUserById(user.id)) {
          return await this.userService.deleteUserById(id);
        }
      } else {
        const lowercaseEmail = idOrEmail.toLowerCase();
        const user: User =
          await this.userService.getUserByEmail(lowercaseEmail);

        if (user === null) {
          throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.deleteUserById(user.id);
      }
    } catch (error) {
      throw error;
    }
  }
  @Patch(':idOrEmail')
  async updateUser(
    @Param('idOrEmail') idOrEmail: string,
    @Body() user: UpdateUserDto,
    @Query('byId') byId: boolean = false,
  ) {
    try {
      if (byId) {
        const id = parseInt(idOrEmail, 10);
        if (isNaN(id)) {
          throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        if (this.userService.getUserById(id)) {
          return await this.userService.updateUser(id, user);
        }
      } else {
        const lowercaseEmail = idOrEmail.toLowerCase();
        const user_pivot: User =
          await this.userService.getUserByEmail(lowercaseEmail);
        if (!user_pivot) {
          throw new NotFoundException(
            'User Not Found: The specified email does not exist.',
          );
        }
        return await this.userService.updateUser(user_pivot.id, user);
      }
    } catch (error) {
      throw error;
    }
  }
}
