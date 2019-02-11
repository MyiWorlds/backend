import addToProfileHistory from '../mutations/addToProfileHistory';
import firestore from './../index';
import stackdriver from './../../../stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { defaultCircleSwitch } from '../functions';
import { userCanView } from './../rules';

export default async function getDocumentsByIds(
  collection: string,
  ids: string[],
  context: Context,
  addToHistoryOverride?: boolean,
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

      const createAndAddToHistory = () => {
        const circle = {
          type: 'VIEWED_BY_IDS',
          data: {
            collection,
            ids,
          },
        };

        addToProfileHistory(circle, context);
      };

      if (addToHistoryOverride !== undefined) {
        if (addToHistoryOverride) {
          createAndAddToHistory();
        }
      } else if (context.addToHistory) {
        createAndAddToHistory();
      }

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
          document.type = response.push(defaultCircleSwitch(document, context));
        } else if (userCanView(document, context)) {
          response.push(document);
        } else {
          document.type = 'PERMISSION_DENIED';
          response.push(defaultCircleSwitch(document, context));
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
