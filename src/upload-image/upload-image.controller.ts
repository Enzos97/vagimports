import { Controller, UseInterceptors, UploadedFiles, UploadedFile, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { CreateUploadImageDto } from './dto/create-upload-image.dto';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';


@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Get()
  findAll() {
    return this.uploadImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadImageDto: UpdateUploadImageDto) {
    return this.uploadImageService.update(+id, updateUploadImageDto);
  }

  @Delete()
  deleteFile(@Body() body: { id: string }) {
    return this.uploadImageService.deleteFile(body.id);
  }
}
//https://vagimports-ixyvhebc6a-rj.a.run.app/upload-image