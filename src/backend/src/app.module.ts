// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
require('dotenv').config();

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.username_db}:${process.env.password_db}@quizizz.z1faq82.mongodb.net/?retryWrites=true&w=majority`),
    UserModule,
  ],
})
export class AppModule {}
