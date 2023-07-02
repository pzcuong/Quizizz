import { UserService } from './user.service';
import { Controller, Get, Headers } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {}

    @Get('profile')
    async getProfile(@Headers('Authorization') token: string) {
        return this.UserService.getUser(token);
    }
    
}
