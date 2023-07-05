import { Controller, Post, Get, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get('send')
    async sendMail() {
        const data = {
            to: 'pzcuong.uit@gmail.com',
            subject: 'Hello from NestJS - mail 2',
            text: 'This is a test email'
        }
        await this.emailService.sendMail(data.to, data.subject, data.text);
        return { message: 'Email sent successfully' };
    }
}
