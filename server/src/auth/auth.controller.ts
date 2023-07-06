import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { GetCurrentUser } from '../decorators/getCurrentUser.decorator';
import { JwtAuthGuard } from './guard/jwtGuard.guard';
import { Payload, Tokens } from './types';

@Controller('auth')
@UseInterceptors(ResTransformInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Registered successfully')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User logged in successfully')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User logged out successfully')
    @UseGuards(JwtAuthGuard)
    async logout(@GetCurrentUser('id') userId: string): Promise<Tokens> {
        return this.authService.logout(userId);
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User retrieved successfully')
    async getMe(@GetCurrentUser() user: Payload) {
        return user;
    }

    @Post('/refresh')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Tokens refreshed successfully')
    async refreshTokens(@Body() dto: RefreshTokenDto): Promise<Tokens> {
        return await this.authService.refreshTokens(dto);
    }
}
