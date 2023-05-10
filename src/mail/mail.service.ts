import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(email: string, code: number): Promise<void> {
        const mail = {
            from: 'davrachat@gmail.com',
            to: email.toString(),
            subject: 'Hello I\'m Hacker',
            text: 'Hacked your gmail ',
            html: `
            <div style="max-width: 100%; background: #292B2E"; padding: 20px; >
                <h3 style="color: #FFFFFF; margin: 0 auto;">Your activation code</h3>
                <div style="display:flex; align-items: center; border:1px solid #a0a0a0"; border-radius: 12px; max-width: 500px;>
                    <h1 style="margin:10px auto; color: #FFFFFF;">${code}</h1>
                </div>
            </div>
          `,
          };
        await this.mailerService.sendMail(mail);
    }
}
