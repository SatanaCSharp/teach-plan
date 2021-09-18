import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument } from '../users';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async validateCredentials(
    user: Partial<UserDocument>,
    password: string,
  ): Promise<void> {
    const isPassword = user
      ? await bcrypt.compare(password, user?.password)
      : false;

    if (!isPassword) {
      throw new HttpException(
        'Credentials are incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public hasUserExistsWithTheSameEmail(user: Partial<UserDocument>): void {
    if (!isEmpty(user)) {
      throw new HttpException(
        `User with the same email has already signed up!`,
        HttpStatus.CONFLICT,
      );
    }
  }

  public async createAndGetPassword(dtoPassword: string): Promise<string> {
    const SALT_LENGTH = 10;
    const salt = await bcrypt.genSalt(SALT_LENGTH);
    return bcrypt.hash(dtoPassword, salt);
  }

  public generateAccessToken(userDocument: UserDocument): string {
    const payload = { id: userDocument._id };
    return this.jwtService.sign(payload);
  }
}
