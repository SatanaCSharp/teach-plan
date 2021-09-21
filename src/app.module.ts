import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './common';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { RolesModule } from './roles';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
})
export class AppModule {}
