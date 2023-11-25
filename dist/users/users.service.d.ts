import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    private notFoundUser;
    private notRowsAffected;
    private notNumberForId;
    private notValidEmail;
    createUser(user: CreateUserDto): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    deleteUserById(id: number): Promise<import("typeorm").DeleteResult>;
    deleteUserByEmail(email: string): Promise<import("typeorm").DeleteResult>;
    updateUserById(id: number, user: UpdateUserDto): Promise<User & UpdateUserDto>;
    updateUserEmail(email: string, user: UpdateUserDto): Promise<User & UpdateUserDto>;
}
