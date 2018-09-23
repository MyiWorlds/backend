import cloneToNewDocument from './cloneToNewDocument';
import firestore from '../..';
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
  replace: boolean,
) {
  console.time('updateDocumentById time to complete');
  let response: Response = {
    status: '',
    message: '',
    updatedDocumentId: null,
    contextProfileId: context.profileId,
  };

  if (!updatedDocument.id) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a unique id. I need to know what it is you wish for me to update. Please try again.',
      updatedDocumentId: null,
      contextProfileId: context.profileId,
    };
    return response;
  }

  if (!updatedDocument.collection) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.',
      updatedDocumentId: null,
      contextProfileId: context.profileId,
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
          isCreator(updatedDocument.creator, context.profileId) ||
          isEditor(updatedDocument.editors, context.profileId) ||
          isRequestingUser(updatedDocument.id, context.userId)
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
            contextProfileId: context.profileId,
          };
        } else {
          response = {
            status: 'ERROR',
            message:
              'Sorry, you must be the creator or an editor to update this.',
            updatedDocumentId: null,
            contextProfileId: context.profileId,
          };
        }
      });
  } catch (error) {
    stackdriver.report(error);
    response = {
      status: 'ERROR',
      message: 'Sorry, I had an error updating that.  Please try again.',
      updatedDocumentId: null,
      contextProfileId: context.profileId,
    };
  }

  console.timeEnd('updateDocumentById time to complete');
  return response;
}
