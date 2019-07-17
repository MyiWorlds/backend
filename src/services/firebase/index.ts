const serviceAccount = require('../../../service-account.json');
import firebase = require('firebase-admin');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

export default firebase;
