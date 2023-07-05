import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Controller('email')
export class AppController {
    constructor(private readonly emailService: EmailService) {}
}
