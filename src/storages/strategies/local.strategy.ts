import { Injectable } from '@nestjs/common';
import { IStorageStrategy } from './storage.strategy';
import { promises as fs } from 'fs';
import * as path from 'path';

interface LocalStorageConfig {
  baseURL: string;
  storagePath: string;
}

@Injectable()
export class LocalStorageStrategy implements IStorageStrategy {
  private readonly baseURL: string;
  private readonly storagePath: string;

  constructor(config: LocalStorageConfig) {
    this.baseURL = config.baseURL;
    this.storagePath = path.join(process.cwd(), config.storagePath);
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (error) {
      console.error('Error creating storage directory:', error);
    }
  }

  async upload(
    file: Express.Multer.File,
    filePath: string,
  ): Promise<{ url: string; key: string }> {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const fullPath = path.join(this.storagePath, filePath, uniqueFileName);
    const directory = path.dirname(fullPath);

    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(fullPath, file.buffer);

    const url = `${this.baseURL}/${filePath}/${uniqueFileName}`;
    return { url, key: fullPath };
  }

  async delete(key: string): Promise<void> {
    try {
      await fs.unlink(key);
    } catch (error) {
      // Игнорируем ошибку, если файл уже удален
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }
} 