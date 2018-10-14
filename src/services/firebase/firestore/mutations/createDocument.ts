import firestore from '../../firestore/index';
import stackdriver from './../../../stackdriver';

interface Response {
  status: string;
  message: string;
  createdDocumentId: string | null;
  contextProfileId: string;
}

export default async function createDocument(
  documentToCreate: any,
  context: Context,
) {
  console.time('Time to createDocument');
  const response: Response = {
    status: '',
    message: '',
    createdDocumentId: null,
    contextProfileId: context.user.selectedProfileId,
  };

  try {
    if (!documentToCreate.collection) {
      response.status = 'ERROR';
      response.message =
        'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.';

      return response;
    }

    if (!documentToCreate.id) {
      const ref = firestore.collection(documentToCreate.collection).doc();

      documentToCreate.id = ref.id;
    }

    if (!documentToCreate.dateCreated) {
      documentToCreate.dateCreated = Date.now();
    }

    if (!documentToCreate.dateUpdated) {
      documentToCreate.dateUpdated = Date.now();
    }

    await firestore
      .collection(documentToCreate.collection)
      .doc(documentToCreate.id)
      .set(documentToCreate);

    response.status = 'SUCCESS';
    response.message = 'Entity was created';
    response.createdDocumentId = documentToCreate.id;
  } catch (error) {
    stackdriver.report(error);
    response.status = 'ERROR';
    response.message = `There was an error creating the Entity. ${
      error.message
    }`;
    response.createdDocumentId = null;
  }
  console.timeEnd('Time to createDocument');
  return response;
}
