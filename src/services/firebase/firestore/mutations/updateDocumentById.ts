import cloneToNewDocument from './cloneToNewDocument';
import firestore from '../..';
import stackdriver from './../../../stackdriver';
import { isCreator, isEditor, isRequestingUser } from '../rules';

interface Response {
  status: string;
  message: string;
  updatedDocumentId: string | null;
  contextViewerId: string;
}

export default async function updateDocumentById(
  updatedDocument: any,
  contextViewerId: string,
  replace: boolean,
) {
  console.time('updateDocumentById time to complete');
  let response: Response = {
    status: '',
    message: '',
    updatedDocumentId: null,
    contextViewerId,
  };

  if (!updatedDocument.id) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a unique id. I need to know what it is you wish for me to update. Please try again.',
      updatedDocumentId: null,
      contextViewerId,
    };
    return response;
  }

  if (!updatedDocument.collection) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.',
      updatedDocumentId: null,
      contextViewerId,
    };
    return response;
  }

  try {
    await firestore
      .collection(updatedDocument.collection)
      .doc(updatedDocument.id)
      .get()
      .then(async (document: any) => {
        const doc = document.data();
        if (
          isCreator(updatedDocument.creator, contextViewerId) ||
          isEditor(updatedDocument.editors, contextViewerId) ||
          isRequestingUser(updatedDocument.id, contextViewerId)
        ) {
          cloneToNewDocument(doc);

          await firestore
            .collection(updatedDocument.collection)
            .doc(updatedDocument.id)
            .set(updatedDocument, { merge: replace ? false : true });

          response = {
            status: 'SUCCESS',
            message: 'I successfully updated that for you.',
            updatedDocumentId: doc.id,
            contextViewerId,
          };
        } else {
          response = {
            status: 'ERROR',
            message:
              'Sorry, you must be the creator or an editor to update this.',
            updatedDocumentId: null,
            contextViewerId,
          };
        }
      });
  } catch (error) {
    stackdriver.report(error);
    response = {
      status: 'ERROR',
      message: 'Sorry, I had an error updating that.  Please try again.',
      updatedDocumentId: null,
      contextViewerId,
    };
  }

  console.timeEnd('updateDocumentById time to complete');
  return response;
}
