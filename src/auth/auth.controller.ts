import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto, UsersService } from '../users';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

type ResponseAuthUser = Promise<ResponseUserDto & { accessToken: string }>;

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/sign-up')
  public async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
  ): ResponseAuthUser {
    const userDocument = await this.usersService.findByEmail(signUpDto.email);
    this.authService.hasUserExistsWithTheSameEmail(userDocument);
    const password = await this.authService.createAndGetPassword(
      signUpDto.password,
    );
    const createUserDto: CreateUserDto = { ...signUpDto, password };
    const createdUserDocument = await this.usersService.create(createUserDto);
    const accessToken =
      this.authService.generateAccessToken(createdUserDocument);
    const responseUserDto: ResponseUserDto = new ResponseUserDto(
      createdUserDocument,
    );
    return { ...responseUserDto, accessToken };
  }

  @Post('/sign-in')
  public async signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): ResponseAuthUser {
    const userDocument = await this.usersService.findByEmail(signInDto.email);
    await this.authService.validateCredentials(
      userDocument,
      signInDto.password,
    );
    const accessToken = this.authService.generateAccessToken(userDocument);
    const responseUserDto: ResponseUserDto = new ResponseUserDto(userDocument);
    return { ...responseUserDto, accessToken };
  }
}
