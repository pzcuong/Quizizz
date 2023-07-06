import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @IsNotEmpty({ message: 'Refresh token cannot be empty' })
    @IsString()
    refresh_token: string;
}
