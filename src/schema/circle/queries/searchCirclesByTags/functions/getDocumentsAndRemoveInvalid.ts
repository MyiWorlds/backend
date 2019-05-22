import hasFetchedEnough from './hasFetchedEnough';
import removeAllInvalid from './removeAllInvalid';
import { Context } from '../../../../../customTypeScriptTypes/context';
import { getDocumentsByFilters } from '../../../../../services/firebase/firestore/queries';

const getData = async (
  collection: string,
  filters: IFilter[],
  numberOfResults: number,
  cursor: string,
  context: Context,
) => {
  const circle = await getDocumentsByFilters(
    collection,
    filters,
    [], // Select fields
    {
      property: 'dateCreated',
      ascending: true,
    },
    numberOfResults,
    cursor,
    context,
  );

  return circle;
};

export default async function getEntitiesAndRemoveInvalid(
  circle: SearchCircle,
  context: Context,
) {
  const cursor =
    circle.data.cursor && circle.data.cursor.endCursor
      ? circle.data.cursor.endCursor
      : null;

  const query = await getData(
    circle.data.collection,
    circle.data.filters.searchConditions,
    circle.data.numberOfResults,
    cursor,
    context,
  );

  const resultsFiltered = removeAllInvalid(query.lines);

  circle.lines = circle.lines
    ? circle.lines.concat(resultsFiltered)
    : resultsFiltered;
  circle.data.cursor = query.data.cursor;

  const fetchMore = hasFetchedEnough(circle, circle.data.numberOfResults);
  let numberOfRetries = 0;

  while (fetchMore && numberOfRetries < 3) {
    numberOfRetries++;

    const amountToRefetch =
      circle.data.numberOfResults.numberOfResults - circle.lines.length;

    const getMoreData = await getData(
      circle.data.collection,
      circle.data.filters.searchConditions,
      amountToRefetch,
      circle.data.cursor.endCursor,
      context,
    );
    const resultsFiltered2 = removeAllInvalid(getMoreData.lines);

    circle.lines = circle.lines
      ? circle.lines.concat(resultsFiltered2)
      : resultsFiltered2;
    circle.data.cursor = query.data.cursor;
  }

  return circle;
}
