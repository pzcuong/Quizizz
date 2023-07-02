// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './interfaces/user.interface';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())

  @Post('register')
  async register(@Body() user: UserDTO): Promise<any> {
    user = plainToClass(UserDTO, user);
    return this.authService.register(user.username, user.password);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.getNewAccessToken(refreshToken);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() user: UserDTO) {
    user = plainToClass(UserDTO, user);
    return this.authService.login(user.username, user.password);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Body('username') username: string) {
    return this.authService.logout(username);
  }

}
