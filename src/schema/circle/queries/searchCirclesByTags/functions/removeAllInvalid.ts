import removeDoesNotExist from './removeDoesNotExist';
import removePermissionDenied from './removePermissionDenied';

const removeAllInvalid = (unfiltered: SearchCircle[]) => {
  let filtered = [];
  filtered = removeDoesNotExist(unfiltered);
  filtered = removePermissionDenied(filtered);

  return filtered;
};

export default removeAllInvalid;
