import cloneToNewDocument from './cloneToNewDocument';
import firestore from './../index';
import stackdriver from './../../../stackdriver';
import { isCreator, isEditor, isRequestingUser } from '../rules';

interface Response {
  status: string;
  message: string;
  updatedDocumentId: string | null;
  contextProfileId: string;
}

export default async function updateDocumentById(
  updatedDocument: any,
  context: Context,
  merge: boolean,
) {
  console.time('updateDocumentById time to complete');
  let response: Response = {
    status: '',
    message: '',
    updatedDocumentId: null,
    contextProfileId: context.user.selectedProfileId,
  };

  if (!updatedDocument.id) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a unique id. I need to know what it is you wish for me to update. Please try again.',
      updatedDocumentId: null,
      contextProfileId: context.user.selectedProfileId,
    };
    return response;
  }

  if (!updatedDocument.collection) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.',
      updatedDocumentId: null,
      contextProfileId: context.user.selectedProfileId,
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
          isCreator(updatedDocument.creator, context.user.selectedProfileId) ||
          isEditor(updatedDocument.editors, context.user.selectedProfileId) ||
          isRequestingUser(updatedDocument.id, context.user.userId)
        ) {
          cloneToNewDocument(doc);

          if (!updatedDocument.dateUpdated) {
            updatedDocument.dateUpdated = Date.now();
          }

          await firestore
            .collection(updatedDocument.collection)
            .doc(updatedDocument.id)
            .set(updatedDocument, { merge: merge ? true : false });

          response = {
            status: 'SUCCESS',
            message: 'I successfully updated that for you.',
            updatedDocumentId: doc.id,
            contextProfileId: context.user.selectedProfileId,
          };
        } else {
          response = {
            status: 'ERROR',
            message:
              'Sorry, you must be the creator or an editor to update this.',
            updatedDocumentId: null,
            contextProfileId: context.user.selectedProfileId,
          };
        }
      });
  } catch (error) {
    stackdriver.report(error);
    response = {
      status: 'ERROR',
      message: 'Sorry, I had an error updating that.  Please try again.',
      updatedDocumentId: null,
      contextProfileId: context.user.selectedProfileId,
    };
  }

  console.timeEnd('updateDocumentById time to complete');
  return response;
}
