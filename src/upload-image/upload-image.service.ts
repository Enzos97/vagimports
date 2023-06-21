import { Injectable } from '@nestjs/common';
import { CreateUploadImageDto } from './dto/create-upload-image.dto';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class UploadImageService {
  constructor(){}

  // async uploadImageToStorage(files: Express.Multer.File[]){

  //   const storage = new Storage({
  //     projectId: 'vagimports-backend',
  //     keyFilename: 'vagimports-backend-bd0e2275b698.json',
  //   });
  //   const bucketName = 'vagimport-images';

  //   const imageUrls: string[] = [];

  //   for (const file of files) {
  //   const { originalname, buffer } = file;
  //   const fileName = Date.now() + '_' + originalname;
  
  //   // Crea un objeto de archivo en el bucket de Google Cloud Storage
  //   const fileUpload = await storage.bucket(bucketName).file(fileName);
  
  //   // Carga el contenido del archivo
  //   await fileUpload.save(buffer);
  
  //   // Establece las opciones de acceso público para el archivo
  //   //await fileUpload.makePublic();
  //   imageUrls.push(fileUpload.publicUrl());
  // }
  //   // Retorna la URL pública del archivo
  //   return imageUrls
  // }
  // async imageService(base64Data: string, fileName: string): Promise<string> {
  //   const storage = new Storage({
  //     projectId: 'vagimports-backend',
  //     keyFilename: 'vagimports-backend-bd0e2275b698.json',
  //     timeout: 60000
  //   });
  //   const bucketName = 'vagimport-images';

  //   const buffer = Buffer.from(base64Data, 'base64');

  //   const file = storage.bucket(bucketName).file(fileName);
  //   await file.save(buffer);

  //   // Establecer las opciones de acceso público para el archivo si es necesario
  //   // await file.makePublic();
    
  //   return file.publicUrl()
    
     
  // }
  async uploadFiles(name: string, images: string[]) {
    const projectId = 'vagimports-backend'; // Reemplaza con el ID de tu proyecto en Google Cloud
    const bucketName = 'vagimport-images'; // Reemplaza con el nombre del bucket en Google Cloud Storage

    const storage = new Storage({ projectId });
    const bucket = storage.bucket(bucketName);

    const imageUrls: string[] = [];
    
    let v =0
    for (const base64Data of images) {
      // Decodifica el contenido base64 de la imagen
      const imageData = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(imageData, 'base64');

      
      const fileName = `${Date.now()}_${name}_v${v}`;
      v++
      // Crea un archivo en el bucket de Google Cloud Storage
      const file = bucket.file(fileName);

      // Sube el contenido de la imagen al archivo
      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/jpeg', // Reemplaza con el tipo de contenido adecuado para tus imágenes
        },
      });

      const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      imageUrls.push(imageUrl);
    }

    // Realiza cualquier otra operación necesaria con las URLs de las imágenes

    return { imageUrls };
  }
  create(createUploadImageDto: CreateUploadImageDto) {
    return 'This action adds a new uploadImage';
  }

  findAll() {
    return `This action returns all uploadImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadImage`;
  }

  update(id: number, updateUploadImageDto: UpdateUploadImageDto) {
    return `This action updates a #${id} uploadImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadImage`;
  }
}
