import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersionModelService } from './version-model.service';
import { CreateVersionModelDto } from './dto/create-version-model.dto';
import { UpdateVersionModelDto } from './dto/update-version-model.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';

@Controller('version')
export class VersionModelController {
  constructor(private readonly versionModelService: VersionModelService) {}

  @Post()
  create(@Body() createVersionModelDto: CreateVersionModelDto) {
    return this.versionModelService.create(createVersionModelDto);
  }

  @Get()
  findAll() {
    return this.versionModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',MongoIdPipe) id: string) {
    return this.versionModelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',MongoIdPipe) id: string, @Body() updateVersionModelDto: UpdateVersionModelDto) {
    return this.versionModelService.update(id, updateVersionModelDto);
  }

  @Delete(':id')
  remove(@Param('id',MongoIdPipe) id: string) {
    return this.versionModelService.remove(id);
  }
}
