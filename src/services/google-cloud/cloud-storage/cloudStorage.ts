import { Storage } from '@google-cloud/storage';
const credentials = require('../../../../service-account.json');

export const cloudStorage = new Storage({
  projectId: credentials.project_id,
  credentials,
});
