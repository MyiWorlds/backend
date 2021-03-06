import addToProfileHistory from './addToProfileHistory';
import cloneToNewDocument from './cloneToNewDocument';
import firestore from '../index';
import stackdriver from '../../../stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { isCreator, isEditor, isRequestingUser } from '../rules';

interface Response {
  status: string;
  message: string;
  updatedDocumentId: string | null;
  previousCloneId: string | null;
  contextProfileId: string;
}

export default async function updateDocumentById(
  updatedDocument: any,
  context: Context,
  merge: boolean,
  addToHistory?: boolean,
) {
  console.time('updateDocumentById time to complete');
  let response: Response = {
    status: '',
    message: '',
    updatedDocumentId: null,
    previousCloneId: null,
    contextProfileId: context.selectedProfileId,
  };

  if (!updatedDocument.id) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a unique id. I need to know what it is you wish for me to update. Please try again.',
      updatedDocumentId: null,
      previousCloneId: null,
      contextProfileId: context.selectedProfileId,
    };
    return response;
  }

  if (!updatedDocument.collection) {
    response = {
      status: 'ERROR',
      message:
        'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.',
      updatedDocumentId: null,
      previousCloneId: null,
      contextProfileId: context.selectedProfileId,
    };
    return response;
  }

  try {
    const documentToUpdate = await firestore
      .collection(updatedDocument.collection)
      .doc(updatedDocument.id)
      .get()
      .then((res: any) => res.data());

    await firestore
      .collection(updatedDocument.collection)
      .doc(updatedDocument.id)
      .get()
      .then(async (document: any) => {
        const doc = document.data();
        if (
          isCreator(documentToUpdate.creator, context.selectedProfileId) ||
          isEditor(documentToUpdate.editors, context.selectedProfileId) ||
          isRequestingUser(documentToUpdate.id, context.selectedProfileId) ||
          isRequestingUser(documentToUpdate.id, context.userId)
        ) {
          cloneToNewDocument(doc);

          updatedDocument.dateUpdated = Date.now();

          await firestore
            .collection(updatedDocument.collection)
            .doc(updatedDocument.id)
            .set(updatedDocument, { merge: merge ? true : false });

          response = {
            status: 'SUCCESS',
            message: 'I successfully updated that for you.',
            updatedDocumentId: updatedDocument.id,
            previousCloneId: doc.id,
            contextProfileId: context.selectedProfileId,
          };
        } else {
          response = {
            status: 'ERROR',
            message:
              'Sorry, you must be the creator or an editor to update this.',
            updatedDocumentId: null,
            previousCloneId: null,
            contextProfileId: context.selectedProfileId,
          };
        }
      });

    if (
      addToHistory ||
      (context.addToHistory &&
        addToHistory === undefined &&
        addToHistory !== false)
    ) {
      const circle = {
        type: 'UPDATED',
        data: {
          id: updatedDocument.id,
          collection: updatedDocument.collection,
        },
      };

      addToProfileHistory(circle, context);
    }
  } catch (error) {
    stackdriver.report(error);
    response = {
      status: 'ERROR',
      message: 'Sorry, I had an error updating that.  Please try again.',
      updatedDocumentId: null,
      previousCloneId: null,
      contextProfileId: context.selectedProfileId,
    };
  }

  console.timeEnd('updateDocumentById time to complete');
  return response;
}
