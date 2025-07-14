import { Injectable } from '@nestjs/common';
import { IStorageStrategy } from './storage.strategy';
import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

@Injectable()
export class CloudinaryStorageStrategy implements IStorageStrategy {
  constructor(private readonly config: CloudinaryConfig) {
    cloudinary.config(this.config);
  }

  upload(
    file: Express.Multer.File,
    path: string,
  ): Promise<{ url: string; key: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: path },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Cloudinary upload failed: no result returned.'));
          }
          resolve({ url: result.secure_url, key: result.public_id });
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async delete(key: string): Promise<void> {
    await cloudinary.uploader.destroy(key);
  }
} 