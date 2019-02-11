import firestore from './../index';
import stackdriver from '../../../stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { defaultCircleSwitch } from './../functions';
import { userCanView } from '../rules';

export default async function getDocumentsByFilters(
  collection: string,
  filters: IFilter[],
  selectFields: string[],
  orderBy: IOrderBy,
  numberOfResults: number,
  pageCursor: string | null,
  context: Context,
) {
  console.time('getDocumentsByFilters TTC');

  if (numberOfResults > 100) {
    numberOfResults = 100;
  }

  const response: IGetDocumentsByFiltersResponse = {
    type: 'QUERY',
    data: {
      collection,
      filters,
      selectFields,
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

    if (selectFields.length) {
      query = query.select(selectFields.join());
    }

    if (pageCursor) {
      // Need to update this to pass in value for sort order
      query = query
        .orderBy(orderBy.property, orderBy.ascending ? 'asc' : 'desc')
        .startAfter(pageCursor)
        .limit(numberOfResults);
    } else {
      query = query
        .orderBy(orderBy.property, orderBy.ascending ? 'asc' : 'desc')
        .limit(numberOfResults);
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
          result.type = 'PERMISSION_DENIED';
          response.lines.push(defaultCircleSwitch(result, context));
        }
        return result;
      });

      const lastItemFetched = data[data.length - 1][orderBy.property];
      response.data.cursor = lastItemFetched;

      return response;
    });
  } catch (error) {
    stackdriver.report(error);
    response.lines = [];
  }
  console.timeEnd('getDocumentsByFilters TTC');
  return response;
}
