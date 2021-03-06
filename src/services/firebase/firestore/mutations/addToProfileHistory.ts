import createDocument from './createDocument';
import updateDocumentById from './updateDocumentById';
import { Circle } from '../../../../customTypeScriptTypes/circle';
import { Context } from '../../../../customTypeScriptTypes/context';
import { defaultCircleSwitch } from '../functions';

const addToProfileHistory = (circle: Circle, context: Context) => {
  if (context.profileHistoryId) {
    circle = { ...circle, ...defaultCircleSwitch(circle, context) };
    createDocument(circle, context, false);
    const updatedCircle = {
      id: context.profileHistoryId,
      collection: circle.collection,
    };
    updateDocumentById(updatedCircle, context, true, false);
    return;
  } else {
    return;
  }
};

export default addToProfileHistory;
