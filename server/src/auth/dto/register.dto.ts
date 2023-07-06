import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    password: string;

    @IsString({ message: 'Confirm Password must be a string' })
    @Length(8, 20, {
        message: 'Confirm Password must be between 8 and 20 characters',
    })
    confirmPassword: string;

    @IsString({ message: 'Display Name must be a string' })
    @Length(3, 20, {
        message: 'Display Name must be between 3 and 20 characters',
    })
    displayName: string;
}
