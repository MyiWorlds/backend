const firebase = require('firebase-admin');
const serviceAccount = require('../../../service-account.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

export default firebase;

// const admin = require('firebase-admin');

// const serviceAccount = require('../../service-account.json');

// let firestore = null;

// if (!admin.apps.length) {
//   firestore = new admin.firestore();

//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });

//   const settings = {
//     timestampsInSnapshots: true,
//   };

//   firestore.settings(settings);
// }

// export default firestore;
