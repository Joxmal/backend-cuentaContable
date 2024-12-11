import { Injectable } from '@nestjs/common';
import { unlink } from 'fs';

@Injectable()
export class FileService {
  async deleteFile(filePath: string): Promise<void> {

    // console.log(filePath)
    return new Promise((resolve, reject) => {
      unlink(filePath, (error) => {
        if (error) {
          console.error(error)
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
