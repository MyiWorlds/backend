import { getEntities } from "../../../gcp/datastore/queries";
import removeAllInvalid from "./removeAllInvalid";

const hasFetchedEnough = (circle, numberOfResults) => {
  return circle.lines.length <
    numberOfResults &&
    circle.settings.cursor.moreResults === 'MORE_RESULTS_AFTER_LIMIT'
};

const getData = async (kind, searchConditions, numberOfResults, cursor, userUid) => {
  const circle = await getEntities(kind, searchConditions, numberOfResults, cursor, userUid);

  return circle;
}

export default async function getEntitiesAndRemoveInvalid(
  circle,
  userUid,
) {
  const cursor = circle.settings.cursor && circle.settings.cursor.endCursor ? circle.settings.cursor.endCursor : null;

  const query = await getData(
    circle.settings.kind,
    circle.settings.filters.searchConditions,
    circle.settings.numberOfResults,
    cursor,
    userUid,
  );

  const resultsFiltered = removeAllInvalid(query.entities);

  circle.lines = circle.lines ? circle.lines.concat(resultsFiltered) : resultsFiltered;
  circle.settings.cursor = query.cursor;

  const fetchMore = hasFetchedEnough(circle, circle.settings.numberOfResults);
  let numberOfRetries = 0

  while(fetchMore && numberOfRetries < 3) {
    numberOfRetries++

      const amountToRefetch = numberOfResults - circle.lines.length;

      const getMoreData = await getData(
        circle.settings.kind,
        circle.settings.filters.searchConditions,
        amountToRefetch,
        circle.settings.cursor.endCursor,
        userUid,
      );
      const resultsFiltered2 = removeAllInvalid(getMoreData.entities);

      circle.lines = circle.lines ? circle.lines.concat(resultsFiltered2) : resultsFiltered2;
      circle.settings.cursor = query.cursor;
  }

  return circle;
}
