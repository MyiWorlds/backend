import { Circle } from '../../../../customTypeScriptTypes/circle';
import { Context } from '../../../../customTypeScriptTypes/context';
import { updateDocumentById } from '../../../../services/firebase/firestore/mutations';

const updateCircle = (circle: Circle, merge: boolean, context: Context) =>
  updateDocumentById(circle, context, merge);

export default updateCircle;
