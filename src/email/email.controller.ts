import { Controller, Post, Get, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get('send')
    async sendMail() {
        const data = {
            email: 'pzcuong.uit@gmail.com',
            subject: 'Test',
            text: 'Hello world',
        }
        const response = await this.emailService.sendMail(data.email, data.subject, data.text);
        try {
            return {
                statusCode: 200,
                message: 'Send mail successfully',
                data: response,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    @Post('send')
    async sendMailPost(@Body() data) {
        const response = await this.emailService.sendMail(data.email, data.subject, data.text);
        try {
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}
