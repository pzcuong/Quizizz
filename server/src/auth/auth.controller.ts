// auth.controller.ts
import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('auth')
export class AuthController {
    constructor(private firebaseService: FirebaseService) {}

    @Get('login/github')
    async loginGithub(@Req() req) {
        const { user } = req;
        console.log(user);
    }

    @Post('login')
    async login(@Body('idToken') idToken: string) {
        const decodedToken = await this.firebaseService.verifyIdToken(idToken);
        const user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture,
        };
        console.log(user);

        return user;
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        const newToken = await this.firebaseService.refreshToken(refreshToken);
        return { token: newToken };
    }
}
