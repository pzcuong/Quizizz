// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './interfaces/user.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDTO>,
    @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<any>,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    let user = await this.userModel.findOne({ username });
    if (user)
      return { message: 'Username already exists' };

    const hashedPassword = await bcrypt.hash(password, 12);
    const accessToken = this.jwtService.sign({ username: username });
    const refreshToken = this.jwtService.sign({}, { expiresIn: process.env.expires_refresh_token });

    user = new this.userModel({ username, password: hashedPassword, refresh_token: refreshToken });
    await user.save();

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getNewAccessToken(refreshToken: string) {
    const storedToken = await this.refreshTokenModel.findOne({ token: refreshToken });

    if (!storedToken) 
      throw new Error('Invalid refresh token');

    const payload = this.jwtService.verify(refreshToken);
    const newAccessToken = this.jwtService.sign({ username: payload.username });

    return {
      access_token: newAccessToken,
    };
  }

  async validateUser(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) 
      return null;
    return user;
  }

  async validateUserPassword(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) 
      return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) 
      return null;

    return user;
  }

  async saveRefreshToken(username: string, refreshToken: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) 
      return null;

    user.refresh_token = refreshToken;
    await user.save();
  }

  async login (username: string, password: string) {
    const user = await this.validateUserPassword(username, password);
    if (!user) 
      return { message: 'Invalid username or password' };

    const accessToken = this.jwtService.sign({ username: username });
    const refreshToken = this.jwtService.sign({}, { expiresIn: process.env.expires_refresh_token });

    await this.saveRefreshToken(username, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async logout (username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) 
      return null;

    user.refresh_token = null;
    await user.save();
  }
}
