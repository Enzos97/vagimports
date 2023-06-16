import { Controller, UseInterceptors, UploadedFiles, UploadedFile, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { CreateUploadImageDto } from './dto/create-upload-image.dto';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';


@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}
  
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  //   const imageUrl = await this.uploadImageService.uploadImageToStorage(file);
  //   // Realiza cualquier otra operación necesaria con la URL de la imagen
  //   return { imageUrl };
  // }

  // @Post('uploads')
  // @UseInterceptors(FilesInterceptor('files'))
  // async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   console.log(files);
  //   const imageUrl = await this.uploadImageService.uploadImageToStorage(files);
  //   // Realiza cualquier otra operación necesaria con la URL de la imagen
  //   return { imageUrl };
  // }
  // @Post('upload')
  // async uploadImage(@Body(new ValidationPipe({ transform: true })) body: CreateUploadImageDto) {
  //   const { base64Data, fileName } = body;
  //   const imageUrl = await this.uploadImageService.imageService(base64Data, fileName);

  //   return { imageUrl };
  // }
  // @Post()
  // async uploadFile(@Body() body: { nombre: string, imagen: string }) {
  //   const projectId = 'vagimports-backend'; // Reemplaza con el ID de tu proyecto en Google Cloud
  //   const bucketName = 'vagimport-images'; // Reemplaza con el nombre del bucket en Google Cloud Storage

  //   const storage = new Storage({ projectId });
  //   const bucket = storage.bucket(bucketName);

  //   // Decodifica el contenido base64 de la imagen
  //   const base64Data = body.imagen.replace(/^data:image\/\w+;base64,/, '');
  //   const imageBuffer = Buffer.from(base64Data, 'base64');

  //   const fileName = `${Date.now()}_${body.nombre}`;

  //   // Crea un archivo en el bucket de Google Cloud Storage
  //   const file = bucket.file(fileName);

  //   // Sube el contenido de la imagen al archivo
  //   await file.save(imageBuffer, {
  //     metadata: {
  //       contentType: 'image/jpeg', // Reemplaza con el tipo de contenido adecuado para tu imagen
  //     },
  //   });

  //   const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

  //   // Realiza cualquier otra operación necesaria con la URL de la imagen

  //   return { imageUrl };
  // }
  @Post()
  async uploadFiles(@Body() body: { nombre: string, imagenes: string[] }) {
    return this.uploadImageService.uploadFiles(body);
  }
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadImageService.remove(+id);
  }
}
