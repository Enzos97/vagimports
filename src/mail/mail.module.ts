import { Global, Module, forwardRef } from '@nestjs/common';
import { MailService } from './mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { CommonModule } from './../common/common.module';

@Global()
@Module({
  imports: [
  ScheduleModule.forRoot(),
  ConfigModule,
  MailerModule.forRootAsync({
    useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port:465,
          secure: true,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    CommonModule
  ],
  providers: [MailService],
  exports:[MailService]
})
export class MailModule {}