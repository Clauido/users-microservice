import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<User[]>;
    getUser(idOrEmail: string, byId?: boolean): Promise<User>;
    createUser(newUser: CreateUserDto): Promise<User>;
    deleteUser(idOrEmail: string, byId?: boolean): Promise<import("typeorm").DeleteResult>;
    updateUser(idOrEmail: string, user: UpdateUserDto, byId?: boolean): Promise<User & UpdateUserDto>;
}
