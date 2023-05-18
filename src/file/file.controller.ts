import { Controller, Get, HttpStatus, Res, StreamableFile, } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import * as fs from 'fs';;
import { join } from 'path';

@Controller('file')
export class FileController {
  @Get()
  getFile(@Res() response: Response) {
    const videoPath = join(process.cwd(), 'b.mp4');
    console.log(videoPath)
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const range = response.req.headers.range;
    const CHUNK_SIZE = 10 ** 6; // 1 MB
    const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    const contentLength = end - start + 1;

    response.writeHead(HttpStatus.PARTIAL_CONTENT, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
      'Cache-Control': 'max-age=604800, must-revalidate'
    });

    const stream = fs.createReadStream(videoPath, { start, end });

    stream.on('open', () => stream.pipe(response));
    stream.on('error', (streamErr) => response.end(streamErr));
  }

  @Get('/test')
  asa() {
    return 'ok'
  }
}