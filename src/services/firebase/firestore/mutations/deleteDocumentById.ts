import firestore from './../index';
import stackdriver from './../../../stackdriver';
import { isCreator, isRequestingUser } from './../rules';
// import getDocumentsByFilters from '../queries/getDocumentsByFilters';

interface Response {
  status: string;
  message: string;
  uidToDelete: string;
  numberOfClones: number;
  clonesDeleted: boolean;
  wasDeleted: boolean;
}

export default async function deleteDocument(
  collection: string,
  id: string,
  context: Context,
) {
  console.time('deleteDocument time to complete');

  let response: Response = {
    status: '',
    message: '',
    uidToDelete: id,
    numberOfClones: 0,
    clonesDeleted: false,
    wasDeleted: false,
  };

  // const maxQueryResults = 499;

  try {
    const documentExists = await firestore
      .collection(collection)
      .doc(id)
      .get()
      .then((res: any) => res.data());

    if (!documentExists) {
      response = {
        status: 'ERROR',
        message:
          'I could not find what you are trying to delete, it no longer exists.',
        uidToDelete: id,
        numberOfClones: 0,
        clonesDeleted: false,
        wasDeleted: false,
      };
    }

    if (
      isCreator(documentExists.creator, context.selectedProfileId) ||
      isRequestingUser(documentExists.id, context.userId)
    ) {
      let keepDeleting = true;
      let cursor = null;

      while (keepDeleting) {
        await firestore
          .collection(`${collection}-clones`)
          .where(`${collection}Id`, '==', id)
          .orderBy('dateCreated', 'desc')
          .startAfter(cursor)
          .limit(1)
          .get()
          .then((querySnapshot: any) => {
            if (querySnapshot.empty) {
              keepDeleting = false;
              cursor = null;
              return;
            }

            response.numberOfClones =
              response.numberOfClones + querySnapshot.docs.length;

            const batch = firestore.batch();

            querySnapshot.docs.forEach((doc: any) => {
              batch.delete(doc.ref);
            });

            return batch.commit();
          })
          .then((res: any) => {
            console.log('Deleted all', res);
          });

        // delete clones

        keepDeleting = true;
        cursor = '';
      }

      if (response.numberOfClones) {
        response.clonesDeleted = true;
      }

      // Delete the master
      firestore
        .collection(collection)
        .doc(id)
        .delete()
        .then((res: any) => {
          if (res.success) {
            response = {
              status: 'SUCCESS',
              message: 'I successfully deleted that and its clones for you',
              uidToDelete: id,
              numberOfClones: response.numberOfClones,
              clonesDeleted: response.clonesDeleted,
              wasDeleted: true,
            };
          } else {
            response = {
              status: 'ERROR',
              message:
                'I had an error deleting that.  My function deleteDocument failed.',
              uidToDelete: id,
              numberOfClones: response.numberOfClones,
              clonesDeleted: response.clonesDeleted,
              wasDeleted: false,
            };
          }
        });
    } else {
      response = {
        status: 'ERROR',
        message:
          'Sorry, I could not delete that. You must be the creator to delete this.',
        uidToDelete: id,
        numberOfClones: response.numberOfClones,
        clonesDeleted: response.clonesDeleted,
        wasDeleted: false,
      };
    }
  } catch (error) {
    stackdriver.log(error);
    response = {
      status: 'ERROR',
      message: 'I had an error, please refresh and try again try again.',
      uidToDelete: id,
      numberOfClones: response.numberOfClones,
      clonesDeleted: response.clonesDeleted,
      wasDeleted: false,
    };
  }
  console.timeEnd('deleteDocument time to complete');
  return response;
}
