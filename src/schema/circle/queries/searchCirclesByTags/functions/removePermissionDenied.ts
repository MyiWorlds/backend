import { SearchCircle } from '../../../../../customTypeScriptTypes/circle';

const removePermissionDenied = (circles: SearchCircle[]) => {
  return circles.filter(circle => circle.type !== 'PERMISSION_DENIED');
};

export default removePermissionDenied;
