import { Injectable } from '@nestjs/common';
import { AzureFilesService } from './azure.file.service';
import { uuid } from 'uuidv4';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadAzureService {
  constructor(
    private readonly fileService: AzureFilesService,
    private readonly configService: ConfigService,
  ) {}

  async upload(imageBuffer: Buffer, file: any) {
    const extension = file.originalname.split('.').pop();
    const blobName = this.getExtension(extension, uuid());
    const containerName = this.configService.get('AZURE_CONTAINER_NAME');
  }

  public getExtension(extension: string, uuid: string) {
    const allowedFiles = ['jpg', 'png', 'png', 'jpeg', 'bmp', 'webp'];
    return `${uuid}.${allowedFiles.includes(extension) ? extension : 'jpeg'}`;
  }
}
