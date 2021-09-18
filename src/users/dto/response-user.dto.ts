import { UserDocument } from '../user.schema';

export class ResponseUserDto {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  constructor(user: UserDocument) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}
