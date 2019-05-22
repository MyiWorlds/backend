const hasFetchedEnough = (circle: SearchCircle, numberOfResults: number) => {
  return (
    circle.lines.length < numberOfResults &&
    circle.data.cursor.moreResults === 'MORE_RESULTS_AFTER_LIMIT'
  );
};

export default hasFetchedEnough;
