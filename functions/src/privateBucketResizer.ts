import * as functions from 'firebase-functions';
import { buckets } from './buckets';
import { imageResize } from './imageResize';
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';

export const privateBucketResizer = functions.storage
  .bucket(buckets.development.image.private)
  .object()
  .onFinalize((object: ObjectMetadata) => {
    return imageResize(object);
  });
