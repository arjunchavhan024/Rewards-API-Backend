import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.seedUsers();
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  private async seedUsers(): Promise<void> {
    const count = await this.userModel.countDocuments();
    if (count === 0) {
      const mockUsers = [
        { email: 'john.doe@example.com', name: 'John Doe' },
        { email: 'jane.smith@example.com', name: 'Jane Smith' },
        { email: 'bob.wilson@example.com', name: 'Bob Wilson' },
        { email: 'alice.brown@example.com', name: 'Alice Brown' },
        { email: 'charlie.davis@example.com', name: 'Charlie Davis' },
      ];

      await this.userModel.insertMany(mockUsers);
      console.log('Mock users seeded successfully');
    }
  }
}