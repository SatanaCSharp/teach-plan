import { Injectable } from '@nestjs/common';

import { BaseService } from '../common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService extends BaseService<
  CreateUserDto,
  UpdateUserDto,
  UserDocument
> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  public findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).populate('role').exec();
  }

  public findAll(): Promise<UserDocument[]> {
    return this.userModel.find({}).populate('role').exec();
  }
}
