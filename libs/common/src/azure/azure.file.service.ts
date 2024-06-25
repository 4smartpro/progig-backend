import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import * as crypto from 'crypto';

@Injectable()
export class AzureFilesService {
  constructor(private configService: ConfigService) {}
  private containerName = 'assets';

  private async getBlobServiceInstance() {
    const connectionString = this.configService.get('AZURE_CONNECTION_STRING');

    return BlobServiceClient.fromConnectionString(connectionString);
  }

  private async getBlobClient(imageName: string): Promise<BlockBlobClient> {
    const blobService = await this.getBlobServiceInstance();
    const containerName = this.containerName;
    const containerClient = blobService.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);

    return blockBlobClient;
  }

  public async singleUpload(
    _file: any,
    containerName?: string,
  ): Promise<string> {
    if (containerName) this.containerName = containerName;

    const file = await _file;

    const extension = file.filename.split('.').pop();
    const file_name = crypto.randomUUID() + '.' + extension;
    const blockBlobClient = await this.getBlobClient(file_name);
    const fileUrl = blockBlobClient.url;

    const stream = file.createReadStream();

    const buffer = await this.streamToBuffer(stream);

    await blockBlobClient.uploadData(buffer);

    return fileUrl;
  }

  // public async multipleUpload(
  //   _files: any[],
  //   containerName?: string,
  // ): Promise<string> {
  //   if (containerName) this.containerName = containerName;

  //   const buffers = [];
  //   for (const _file of _files) {
  //     const file = await _file;
  //     const extension = file.filename.split('.').pop();
  //     const file_name = crypto.randomUUID() + '.' + extension;
  //     const blockBlobClient = await this.getBlobClient(file_name);
  //     const fileUrl = blockBlobClient.url;

  //     const stream = file.createReadStream();

  //     const buffer = await this.streamToBuffer(stream);
  //     buffers.push(buffer);
  //   }

  //   await blockBlobClient.uploadData(buffers);

  //   return fileUrl;
  // }

  private async streamToBuffer(stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
