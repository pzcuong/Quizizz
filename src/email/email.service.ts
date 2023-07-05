import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer-smtp-transport';
require('dotenv').config();

@Injectable()
export class EmailService {
    private readonly mailer;

    constructor() {
        console.log(process.env.EMAIL_USERNAME);
        console.log(process.env.EMAIL_PASSWORD);
        
        this.mailer = nodemailer.createTransport(
            SMTPTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            }),
        );
    }

    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            text,
        };

        try {
            await this.mailer.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Failed to send the email', error);
        }
    }
}
