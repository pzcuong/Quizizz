import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    LoginDto,
    RefreshTokenDto,
    RegisterDto,
    ResetPasswordDto,
} from './dto';
import { ResponseMessage } from '../decorators/responseMessage.decorator';
import { ResTransformInterceptor } from '../interceptors/response.interceptor';
import { GetCurrentUser } from '../decorators/getCurrentUser.decorator';
import { JwtAuthGuard } from './guard/jwtGuard.guard';
import { Payload, Tokens } from './types';
import { EmailDto } from './dto/forgotPassword.dto';

@Controller('auth')
@UseInterceptors(ResTransformInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Registered successfully, please check your email')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('/resend-confirmation')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Confirmation email sent successfully')
    async resendConfirmation(@Body() dto: EmailDto) {
        await this.authService.resendConfirmation(dto.email);
        return null;
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

    @Post('/forgot-password')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Reset password link sent successfully')
    async forgotPassword(@Body() dto: EmailDto) {
        await this.authService.forgotPassword(dto.email);
        return null;
    }

    @Post('/reset-password')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Password reset successfully')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @Post('/refresh')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Tokens refreshed successfully')
    async refreshTokens(@Body() dto: RefreshTokenDto): Promise<Tokens> {
        return await this.authService.refreshTokens(dto);
    }

    @Get('/confirm/:token')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User confirmed successfully')
    async confirm(@Param('token') token: string) {
        return this.authService.confirmEmail(token);
    }
}
