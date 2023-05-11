import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

console.log(process.env.AWS_BUCKED_NAME)
 
@Injectable()
export class S3Service {

  async upload(file: any) {
    const { originalname, mimetype } = file;
    const bucketS3 = process.env.AWS_BUCKED_NAME;
    const data = await this.uploadS3(
      file.buffer,
      bucketS3,
      originalname,
      mimetype,
    );
    return data['Location'];
  }

  async uploadS3(file: any, bucket: any, name: string, mimetype: any) {
    return new Promise((resolve, reject) => {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      });

      s3.upload(
        {
          Bucket: bucket,
          Key: String(name),
          Body: file,
          ContentType: String(mimetype),
        },
        (err: any, data: any) => {
          if (err) reject(err.message);
          resolve(data);
        },
      );
    });
  }

}
