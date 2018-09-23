import firestore from './../index';
import stackdriver from '../../../stackdriver';
import { defaultCircleSwitch } from './../functions/defaultCircleSwitch';
import { userCanView } from '../rules';

//  Need to update how I handle the property that it is sorted on (searched on) to be dynamic
// Make it so I can use this same function to navigate forwards as well based on prop
interface Filter {
  property: string;
  condition: string;
  value: string | number | boolean;
}

interface Response {
  type: string;
  settings: {
    collection: string;
    filters: Filter[];
    orderBy: string;
    numberOfResults: number;
    cursor: any | null;
  };
  lines: any[];
}

export default async function getDocumentsByFilters(
  collection: string,
  filters: Filter[],
  orderBy: string,
  numberOfResults: number,
  pageCursor: any | null,
  context: Context,
) {
  console.time('getDocumentsByFilters time to complete');

  if (numberOfResults > 100) {
    numberOfResults = 100;
  }

  const response: Response = {
    type: 'QUERY',
    settings: {
      collection,
      filters,
      orderBy,
      numberOfResults,
      cursor: pageCursor || null,
    },
    lines: [],
  };

  try {
    let query = firestore.collection(collection);

    if (filters) {
      filters.forEach(filter => {
        query = query.where(filter.property, filter.condition, filter.value);
      });
    }

    if (pageCursor) {
      query = query
        .orderBy(orderBy)
        .startAfter(pageCursor)
        .limit(numberOfResults);
    } else {
      query = query.orderBy(orderBy).limit(numberOfResults);
    }

    query = await query.get().then((results: any) => {
      if (results.empty) {
        return response;
      }

      const data = results.docs.map((result: any) => {
        result = result.data();
        if (userCanView(result, context)) {
          response.lines.push(result);
        } else {
          response.lines.push(defaultCircleSwitch('PERMISSION_DENIED', result));
        }
        return result;
      });

      const lastItemFetched = data[data.length - 1][orderBy];
      response.settings.cursor = lastItemFetched;

      return response;
    });
  } catch (error) {
    stackdriver.report(error);
    response.lines = [];
  }
  console.time('getDocumentsByFilters time to complete');
  return response;
}
