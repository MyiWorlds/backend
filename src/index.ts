import { startServer } from './startServer';
const credentials = require('../service-account.json');
const debugAgent = require('@google-cloud/debug-agent');

debugAgent.start({
  allowExpressions: true,
  projectId: credentials.project_id,
  credentials,
});

startServer();
