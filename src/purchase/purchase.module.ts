import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './entities/purchase.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsModule } from 'src/products/products.module';
import { MercadopagoModule } from 'src/mercadopago/mercadopago.module';
import { MailModule } from 'src/mail/mail.module';
import { UploadImageModule } from 'src/upload-image/upload-image.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Purchase.name, schema: PurchaseSchema }]),
    CustomersModule,
    ProductsModule,
    MercadopagoModule,
    MailModule,
    CommonModule,
    UploadImageModule
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService,MongooseModule]
})
export class PurchaseModule {}
