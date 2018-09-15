import firebase from '..';

const firestore = new firebase.firestore();

const settings = {
  timestampsInSnapshots: true,
};

firestore.settings(settings);

export default firestore;
