import firestore from './../index';
import stackdriver from './../../../stackdriver';
import { defaultCircleSwitch } from '../functions/defaultCircleSwitch';
import { userCanView } from './../rules';

export default async function getDocumentsByIds(
  collection: string,
  ids: string[],
  context: Context,
) {
  console.time('getDocumentsByIds TTC: ');
  let response: any[] = [];

  try {
    if (ids) {
      const docIds = ids.map((id: string) => {
        return firestore.doc(`${collection}/${id}`);
      });

      const getEntities = await firestore
        .getAll(docIds)
        .then((circles2: any[]) => {
          return circles2.map((cir: any) => cir.data());
        });

      // Transform undefined into objects
      const queryResultOrder = getEntities.reduce(
        (lookupTable: any, item: any) => {
          if (item) {
            lookupTable[item.id] = item;
          }
          return lookupTable;
        },
        {},
      );

      const sortedEntities = ids.reduce((matchingItems: any, id: string) => {
        const item = queryResultOrder[id];

        if (item) {
          matchingItems.push(item);
        }
        if (item === undefined) {
          matchingItems.push({ id, type: 'DOES_NOT_EXIST' });
        }

        return matchingItems;
      }, []);

      sortedEntities.forEach((document: any) => {
        if (document.type === 'DOES_NOT_EXIST') {
          response.push(defaultCircleSwitch('DOES_NOT_EXIST', document));
        } else if (userCanView(document, context)) {
          response.push(document);
        } else {
          response.push(defaultCircleSwitch('PERMISSION_DENIED', document));
        }
      });
    }
  } catch (error) {
    stackdriver.report(error);
    response = [];
  }
  console.timeEnd('getDocumentsByIds TTC: ');
  return response;
}
