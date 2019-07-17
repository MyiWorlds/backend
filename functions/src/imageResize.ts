import * as fs from 'fs-extra';
import sharp from 'sharp';
import { dirname, join } from 'path';
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';
import { Storage } from '@google-cloud/storage';
import { tmpdir } from 'os';

const gcs = new Storage();

export const imageResize = async (object: ObjectMetadata) => {
  if (!object.name || !object.contentType || !object.bucket) {
    return null;
  }
  const bucket = gcs.bucket(object.bucket);
  const filePath = object.name;
  const fileName = filePath.split('/').pop();
  const bucketDir = dirname(filePath);

  const workingDir = join(tmpdir(), 'sizes');
  const tmpFilePath = join(workingDir, 'source.png');
  const fileNamePrefix = '_gsis_'; // short for Google Storage image size

  if (
    fileName &&
    (fileName.includes(fileNamePrefix) || !object.contentType.includes('image'))
  ) {
    return false;
  }

  // 1. Ensure thumbnail dir exists
  await fs.ensureDir(workingDir);

  // 2. Download Source File
  await bucket.file(filePath).download({
    destination: tmpFilePath,
  });

  // 3. Resize the images and define an array of upload promises
  const sizes = [64, 124, 256, 480, 720, 1280, 3840];

  const uploadPromises = sizes.map(async size => {
    const sizeName = `${fileNamePrefix}${size}_${fileName}`;
    const sizePath = join(workingDir, sizeName);

    // Resize source image
    await sharp(tmpFilePath)
      .resize(size, size, {
        // fit: 'contain',
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(sizePath);

    // Upload to GCS
    return bucket.upload(sizePath, {
      destination: join(bucketDir, sizeName),
    });
  });

  // 4. Run the upload operations
  await Promise.all(uploadPromises);

  // 5. Cleanup remove the tmp/sizes from the filesystem
  return fs.remove(workingDir);
};
