import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from 'src/auth/interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDTO>,
        private readonly jwtService: JwtService,
    ) {}

    // parse the token and return the user
    async getUser(token: string) {
        const status = this.jwtService.verify(token);
        if (!status)
            throw new Error('Invalid token');
        return await this.userModel.findOne({ username: status.username });
    }
}
