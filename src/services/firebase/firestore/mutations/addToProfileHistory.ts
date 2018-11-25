import createDocument from './createDocument';
import { defaultCircleSwitch } from '../functions/defaultCircleSwitch';

const addToProfileHistory = (circle: Circle, context: Context) => {
  if (context.profileHistoryId) {
    return createDocument(defaultCircleSwitch(circle, context), context, false);
  } else {
    return;
  }
};

export default addToProfileHistory;
