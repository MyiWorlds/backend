import removeDoesNotExist from './removeDoesNotExist';
import removePermissionDenied from './removePermissionDenied';
import { SearchCircle } from '../../../../../customTypeScriptTypes/circle';

const removeAllInvalid = (unfiltered: SearchCircle[]) => {
  let filtered: SearchCircle[] = [];
  filtered = removeDoesNotExist(unfiltered);
  filtered = removePermissionDenied(filtered);

  return filtered;
};

export default removeAllInvalid;
