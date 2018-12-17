import getEntitiesAndRemoveInvalid from './getEntitiesAndRemoveInvalid';

const hasFetchedEnough = (circle, numberOfResults) => {
  return (
    circle.lines.length < numberOfResults &&
    circle.data.cursor.moreResults === 'MORE_RESULTS_AFTER_LIMIT'
  );
};

export default async function search(
  title,
  icon,
  kind,
  filters,
  numberOfResults,
  cursor,
  userUid,
) {
  let circle = {
    uid: title.replace(/\s+/g, '-'),
    title: title || '',
    icon: icon || 'public',
    type: 'QUERY',
    data: {
      kind,
      filters,
      numberOfResults,
      cursor,
    },
    lines: [],
  };

  circle = await getEntitiesAndRemoveInvalid(
    circle,
    kind,
    filters,
    numberOfResults,
    cursor,
    userUid,
  );

  const fetchMore = hasFetchedEnough(circle, numberOfResults);
  var numberOfRetries = 0;

  while (fetchMore && numberOfRetries < 3) {
    numberOfRetries++;

    const amountToRefetch = numberOfResults - circle.lines.length;

    circle = await getEntitiesAndRemoveInvalid(
      circle,
      kind,
      filters,
      numberOfResults,
      circle.data.cursor.endCursor,
      userUid,
    );
  }

  return circle;
}
