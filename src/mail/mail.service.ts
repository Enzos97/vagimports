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
        const verificationLink = `https://localhost:3000/token`;
    
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
    async send_code_mail_Transferencia(user: string, id:string, code: number) {
      try {
        console.log('mail dto',user,id,code)
        const verificationLink = `https://localhost:3000/token`;
    
        await this.mailerService.sendMail({
          to: user,
          from: `"VAGIMPORTS" <${process.env.MAIL_FROM}>`, // override default from
          subject: 'Verification Code',
          html: `<p>Your verification code is: ${code}</p>
          <p>Click <a href="${verificationLink}">here</a> to verify your account.</p>
          <div style="background-color: #f2f2f2;">
            <div style="padding-top: 20px;padding-bottom: 20px">
              <h2 class="section-header__title" style="color: black;margin-top: 10px;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">Titular de la cuenta:</a> Juan Manuel Garcia</h2>
              <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">Alias:</a> vagimports
                <a><img src="https://storage.googleapis.com/vagimport-images/banco-galicia-logo.svg" style="margin-left: 5px;width: 24px"></a>
              </h2>
              <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">CBU:</a> 0070400120000000444626
                <a><img src="https://storage.googleapis.com/vagimport-images/banco-galicia-logo.svg" style="margin-left: 5px;width: 24px"></a>
              </h2>
              <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">CUIT:</a> 20-40392828-4 </h2>
              <h2 class="section-header__title" style="color: black;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">Banco:</a> Galicia</h2>
            </div>
          </div>`
        });
      } catch (error) {
        this.commonService.handleExceptions(error);
      }
    }

    async send_code_mail_Deposito(user: string, id:string, code: number) {
      try {
        console.log('mail dto',user,id,code)
        const verificationLink = `https://localhost:3000/token`;
    
        await this.mailerService.sendMail({
          to: user,
          from: `"VAGIMPORTS" <${process.env.MAIL_FROM}>`, // override default from
          subject: 'Verification Code',
          html: `<p>Your verification code is: ${code}</p>
          <p>Click <a href="${verificationLink}">here</a> to verify your account.</p>
          <div style="background-color: #f2f2f2;margin-top: -15px">
            <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">Titular de la cuenta:</a> Juan Manuel Garcia</h2>
            <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">N° de cuenta:</a> 0000444-6 400-2
              <a><img src="https://storage.googleapis.com/vagimport-images/banco-galicia-logo.svg" style="margin-left: 5px;width: 24px"></a>
            </h2>
            <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">CBU:</a> 0070400120000000444626
              <a><img src="https://storage.googleapis.com/vagimport-images/banco-galicia-logo.svg" style="margin-left: 5px;width: 24px"></a>
            </h2>
            <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">CUIT:</a> 20-40392828-4</h2>
            <h2 class="section-header__title" style="color: black;margin-bottom: 15px;font-variant:all-petite-caps; font-size: x-large;font-weight: 500"><a style="font-size: small;">Banco:</a> Galicia</h2>
            <hr>
          </div>`
        });
      } catch (error) {
        this.commonService.handleExceptions(error);
      }
    }
}
