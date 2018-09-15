import firestore from './../index';
import stackdriver from './../../../stackdriver';
import { viewerCanView } from './../rules';

export default async function getDocumentById(
  collection: string,
  id: string,
  contextViewerId: string,
) {
  console.time('getDocumentById time to complete: ');

  let response: any = null;

  try {
    const document = await firestore
      .collection(collection)
      .doc(id)
      .get()
      .then((res: any) => res.data());

    if (!document) {
      response = null;
    } else if (viewerCanView(document, contextViewerId)) {
      response = document;
    } else {
      response = {
        id,
        collection,
        type: 'PERMISSION_DENIED',
        title: 'Sorry, you do not have the required permissions to see this.',
      };
    }
  } catch (error) {
    stackdriver.report(error);
    response = null;
  }
  console.timeEnd('getDocumentById time to complete: ');
  return response;
}
