import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findById(userId: string): Promise<User>;
    findAll(): Promise<User[]>;
    private seedUsers;
}
