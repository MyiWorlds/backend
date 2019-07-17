import { buckets } from './buckets';
import { cloudStorage } from './cloudStorage';
import { makeBucketPublic } from './makeBucketPublic';

async function createBucket(bucketName: string) {
  try {
    await cloudStorage.createBucket(bucketName);
  } catch (error) {
    console.error(error);
    return;
  }
  console.log(`Bucket ${bucketName} created.`);
}
const createBuckets = () => {
  const environment = process.env.NODE_ENV as string;

  const bucketDataTypes = Object.keys(buckets[environment]);

  bucketDataTypes.forEach(async (bucketDataType: string) => {
    const bucketType = buckets[environment][bucketDataType];
    try {
      await createBucket(bucketType.private);
      await createBucket(bucketType.public);
      await makeBucketPublic(bucketType.public);
    } catch (error) {
      console.error(error);
    }
  });
};

createBuckets();
