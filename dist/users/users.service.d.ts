import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRerpository;
    constructor(userRerpository: Repository<User>);
    createUser(user: CreateUserDto): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    deleteUserById(id: number): Promise<import("typeorm").DeleteResult>;
    updateUser(id: number, user: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
}
