import { ErrorReporting } from '@google-cloud/error-reporting';
const credentials = require('../../service-account.json');

const stackdriver = new ErrorReporting({
  projectId: credentials.project_id,
  ignoreEnvironmentCheck: true,
  credentials,
});

export default stackdriver;
