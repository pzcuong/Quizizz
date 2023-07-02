import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'RefreshToken', schema: UserSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.secret_key,
    }),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
