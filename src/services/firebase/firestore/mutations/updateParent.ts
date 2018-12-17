import stackdriver from '../../../stackdriver';
import updateDocumentById from './updateDocumentById';

const updateParent = (
  parentId: string,
  parentCollection: string,
  context: Context,
) => {
  try {
    return updateDocumentById(
      { id: parentId, collection: parentCollection },
      context,
      true,
      false,
    );
  } catch (error) {
    stackdriver.report(error);
    return;
  }
};

export default updateParent;
