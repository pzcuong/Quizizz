import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenDto, RegisterDto } from './dto';
import * as argon2 from 'argon2';
import { Payload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Role } from './types/roles.enum';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async register(dto: RegisterDto) {
        const { email, password, confirmPassword, displayName } = dto;
        if (password !== confirmPassword) {
            throw new HttpException(
                'Password do not match confirm password',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashedPassword = await this.hashData(password);
        const userExists = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists) {
            throw new HttpException(
                'User with this email already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newUser = await this.prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
                displayName: displayName,
                isLogin: true,
                role: Role.User,
                avatar: process.env.DEFAULT_AVATAR,
            },
        });
        const payload: Payload = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role as Role,
            displayName: newUser.displayName,
            avatar: newUser.avatar,
        };
        const tokens = await this.generateTokens(payload);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return {
            ...tokens,
            user: {
                id: newUser.id,
                email: newUser.email,
                displayName: newUser.displayName,
                avatar: newUser.avatar,
            },
        };
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;
        const user = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                id: true,
                password: true,
                role: true,
                displayName: true,
                avatar: true,
            },
        });
        if (!user) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.BAD_REQUEST,
            );
        }
        const isPasswordValid = await this.verifyHash(user.password, password);
        if (!isPasswordValid) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload: Payload = {
            email: user.email,
            id: user.id,
            role: user.role as Role,
            displayName: user.displayName,
            avatar: user.avatar,
        };
        const tokens = await this.generateTokens(payload);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
            },
        };
    }

    async logout(userId: string) {
        await this.updateRefreshToken(userId, '');
        return {
            accessToken: '',
            refreshToken: '',
        };
    }

    async getMe(userId: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                email: true,
                id: true,
                avatar: true,
                displayName: true,
                role: true,
            },
        });
        return user;
    }

    async refreshTokens(dto: RefreshTokenDto) {
        try {
            const { refreshToken } = dto;
            const decoded = await this.verifyToken(refreshToken);
            const user = await this.prisma.users.findFirst({
                where: {
                    id: decoded.userId,
                    token: refreshToken,
                },
                select: {
                    email: true,
                    id: true,
                    role: true,
                    displayName: true,
                    avatar: true,
                },
            });
            if (!user) {
                throw new HttpException(
                    'Invalid token',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const payload: Payload = {
                email: user.email,
                id: user.id,
                role: user.role as Role,
                displayName: user.displayName,
                avatar: user.avatar,
            };
            const tokens = await this.generateTokens(payload);
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            return tokens;
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }
    }

    async hashData(data: string) {
        return await argon2.hash(data);
    }

    async verifyHash(hashedData: string, plainData: string) {
        return await argon2.verify(hashedData, plainData);
    }

    async generateTokens(payload: Payload) {
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: process.env.ACCESS_TOKEN_TTL,
            privateKey: process.env.PRIVATE_KEY,
            secret: process.env.JWT_SECRET,
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: process.env.REFRESH_TOKEN_TTL,
            privateKey: process.env.PRIVATE_KEY,
            secret: process.env.JWT_SECRET,
        });
        return { accessToken, refreshToken };
    }

    async verifyToken(token: string) {
        return await this.jwt.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
            publicKey: process.env.PUBLIC_KEY,
        });
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        await this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                token: refreshToken,
            },
        });
    }
}
