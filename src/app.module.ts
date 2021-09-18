import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './common';
import { UsersModule } from './users';
import { AuthModule } from './auth';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), UsersModule, AuthModule],
})
export class AppModule {}
