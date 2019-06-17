import * as functions from 'firebase-functions';
import { buckets } from './buckets';
import { imageResize } from './imageResize';
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';

export const publicBucketResizer = functions.storage
  .bucket(buckets.development.image.public)
  .object()
  .onFinalize((object: ObjectMetadata) => {
    return imageResize(object);
  });
