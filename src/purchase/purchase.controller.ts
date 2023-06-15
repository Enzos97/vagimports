import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { MongoIdPipe } from '../common/pipes/mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  findAll(@Query()paginationDto:PaginationDto) {
    return this.purchaseService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',MongoIdPipe) id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id',MongoIdPipe) id: string) {
    return this.purchaseService.remove(id);
  }
  ///////////////////Client Actions//////////////////////////////
  @Get('client/purchase/:code')
  getClientPurchase(@Param('code') code:string) {
    return this.purchaseService.getPurchaseClient(code);
  }
  @Patch('client/purchase/:code/:id')
  uploadClientPurchase(@Param('id',MongoIdPipe) id:string, @Body() updatePurchaseDto: UpdatePurchaseDto){
    return this.purchaseService.uploadPurchaseClient(id,updatePurchaseDto)
  }
}
