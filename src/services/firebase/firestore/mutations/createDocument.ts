import * as uuid from 'uuid/v1';
import firestore from '../..';
import stackdriver from './../../../stackdriver';

interface Response {
  status: string;
  message: string;
  createdDocumentId: string | null;
  contextViewerId: string;
}

export default async function createDocument(
  documentToCreate: any,
  contextViewerId: string,
) {
  console.time('Time to createDocument');
  let response: Response = {
    status: '',
    message: '',
    createdDocumentId: null,
    contextViewerId,
  };

  try {
    if (!documentToCreate.id) {
      documentToCreate.id = uuid();
    }

    if (!documentToCreate.collection) {
      response = {
        status: 'ERROR',
        message:
          'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.',
        createdDocumentId: null,
        contextViewerId,
      };
      return response;
    }

    await firestore
      .collection(documentToCreate.collection)
      .doc(documentToCreate.id)
      .set(documentToCreate);

    response = {
      status: 'SUCCESS',
      message: 'Entity was created',
      createdDocumentId: documentToCreate.id,
      contextViewerId,
    };
  } catch (error) {
    stackdriver.report(error);
    response = {
      status: 'ERROR',
      message: 'There was an error creating the Entity',
      createdDocumentId: null,
      contextViewerId,
    };
  }
  console.timeEnd('Time to createDocument');
  return response;
}
