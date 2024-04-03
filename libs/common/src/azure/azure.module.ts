import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AzureFilesService } from './azure.file.service';

@Module({
  imports: [ConfigModule],
  exports: [AzureFilesService],
})
export class AzureModule {}
