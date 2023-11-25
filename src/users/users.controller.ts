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
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }
  @Get(':idOrEmail')
  async getUser(
    @Param('idOrEmail') idOrEmail: string,
    @Query('byId') byId: boolean = false,
  ) {
    if (byId) {
      const id = parseInt(idOrEmail, 10);
      return await this.userService.getUserById(id);
    }
    const lowercaseEmail = idOrEmail.toLowerCase();
    return await this.userService.getUserByEmail(lowercaseEmail);
  }
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }
  @Delete(':idOrEmail')
  async deleteUser(
    @Param('idOrEmail') idOrEmail: string,
    @Query('byId') byId: boolean = false,
  ) {
    if (byId) {
      const id = parseInt(idOrEmail, 10);
      return await this.userService.deleteUserById(id);
    }
    const lowercaseEmail = idOrEmail.toLowerCase();
    return await this.userService.deleteUserByEmail(lowercaseEmail);
  }
  @Patch(':idOrEmail')
  async updateUser(
    @Param('idOrEmail') idOrEmail: string,
    @Body() user: UpdateUserDto,
    @Query('byId') byId: boolean = false,
  ) {
    if (byId) {
      const id = parseInt(idOrEmail, 10);
      return await this.userService.updateUserById(id, user);
    }
    const lowercaseEmail = idOrEmail.toLowerCase();
    return await this.userService.updateUserEmail(lowercaseEmail, user);
  }
}
