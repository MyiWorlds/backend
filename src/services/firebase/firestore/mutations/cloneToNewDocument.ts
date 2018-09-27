import * as uuid from 'uuid/v1';
import firestore from './../index';

// This should be in a cloud function
export default async function cloneToNewDocument(doc: any) {
  console.time('cloneToNewDocument time to complete');
  const newCollection = `${doc.collection}-clones`;
  const newUid = uuid();
  const moveOldId = `${doc.collection}Id`;

  doc[moveOldId] = doc.id;
  doc.id = newUid;

  try {
    await firestore
      .collection(newCollection)
      .doc(newUid)
      .set(doc);
  } catch (error) {
    throw error;
  }
  console.timeEnd('cloneToNewDocument time to complete');
}
