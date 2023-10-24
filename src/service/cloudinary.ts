import { Multer } from 'multer';
import * as cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

@Injectable()
export class ImageUploadService {
  async uploadImage(file: Express.Multer.File) {
    try {
      // Create a temporary file to store the buffer
      const tempFilePath = path.join(os.tmpdir(), file.originalname);

      // Write the buffer to the temporary file
      fs.writeFileSync(tempFilePath, file.buffer);

      // Upload the temporary file to Cloudinary
      const result = await cloudinary.v2.uploader.upload(tempFilePath, {
        // Specify your upload options here
      });

      // Delete the temporary file after upload
      fs.unlinkSync(tempFilePath);

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Image upload failed');
    }
  }
}
