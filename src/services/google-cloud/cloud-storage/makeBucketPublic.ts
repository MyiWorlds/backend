import stackdriver from '../../stackdriver';
import { cloudStorage } from './cloudStorage';

export async function makeBucketPublic(bucket: string) {
  try {
    const test = await cloudStorage.bucket(bucket).acl.default.add({
      entity: 'allUsers',
      role: cloudStorage.acl.READER_ROLE,
    });
    console.log(test);
  } catch (error) {
    stackdriver.report(error);
  }
}
