import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseModule } from './purchase/purchase.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ModelCarModule } from './model-car/model-car.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { MailModule } from './mail/mail.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { VersionModelModule } from './version-model/version-model.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.DB_URL),
    ProductsModule,
    CustomersModule, 
    CommonModule, 
    PurchaseModule, 
    CategoryModule,
    BrandModule,
    ModelCarModule,
    MercadopagoModule,
    MailModule,
    UploadImageModule,
    VersionModelModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
