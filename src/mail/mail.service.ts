import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private commonService:CommonService
  ) {}
    async send_code_mail(user: string, id:string, code: number) {
      try {
        console.log('mail dto',user,id,code)
        const verificationLink = `https://localhost:3003/purchase/update/client/${id}`;
    
        await this.mailerService.sendMail({
          to: user,
          from: `"VAGIMPORTS" <${process.env.MAIL_FROM}>`, // override default from
          subject: 'Verification Code',
          html: `<p>Your verification code is: ${code}</p>
                 <p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`,
        });
      } catch (error) {
        this.commonService.handleExceptions(error);
      }
    }
}
