import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    CommonModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports:[CustomersService,MongooseModule]
})
export class CustomersModule {}
