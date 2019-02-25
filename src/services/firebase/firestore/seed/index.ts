import buildAndCreateProfile from '../../../../schema/profile/mutations/createProfile/buildAndCreateProfile';
import createUser from '../../../../schema/user/mutations/createUser/createUser';
import firestore from '..';
import stackdriver from '../../../stackdriver';
import user from './user';
import { updateDocumentById } from '../mutations';

async function theCreationStory() {
  const context = {
    userId: user.id,
    queriedUserId: user.id,
    selectedProfileId: '',
    validated: true,
    addToHistory: false,
    profileHistoryId: '',
  };

  const userExists = await firestore
    .collection('users')
    .doc(user.id)
    .get()
    .then((res: any) => res.data());

  try {
    if (userExists) {
      await updateDocumentById(user, context, true, false);
    } else {
      await createUser(user.id, 'creator@myiworlds.com', context);
      await buildAndCreateProfile('APP', context, true);
    }
  } catch (error) {
    stackdriver.report(error);
  }
}

theCreationStory();
