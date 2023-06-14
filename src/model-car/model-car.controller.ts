import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelCarService } from './model-car.service';
import { CreateModelCarDto } from './dto/create-model-car.dto';
import { UpdateModelCarDto } from './dto/update-model-car.dto';

@Controller('model-car')
export class ModelCarController {
  constructor(private readonly modelCarService: ModelCarService) {}

  @Post()
  create(@Body() createModelCarDto: CreateModelCarDto) {
    return this.modelCarService.create(createModelCarDto);
  }

  @Get()
  findAll() {
    return this.modelCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelCarService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelCarDto: UpdateModelCarDto) {
    return this.modelCarService.update(id, updateModelCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelCarService.remove(id);
  }
}
