import * as uuid from 'uuid/v1';
import createDocument from '../../../../services/firebase/firestore/mutations/createDocument';
import firestore from './../../../../services/firebase/firestore/index';
import updateDocumentById from '../../../../services/firebase/firestore/mutations/updateDocumentById';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { isAllowedUsername } from './isAllowedUsername';

interface Response {
  status: string;
  message: string;
  updatedDocumentId: string | null;
  contextProfileId: string;
}

// This should be in a cloud function
export default async function buildAndCreateProfile(
  username: string,
  context: Context,
) {
  username = username.toLocaleLowerCase();

  if (!isAllowedUsername(username)) {
    const response: Response = {
      status: 'DENIED',
      message:
        'I am sorry, I can not let you use that username.  Please try another',
      updatedDocumentId: null,
      contextProfileId: context.profileId,
    };
    return response;
  }

  try {
    const checkIfUsernameIsTaken = await firestore
      .collection('profiles')
      .where('username', '==', username)
      .limit(1)
      .get()
      .then((response: any) => {
        return response.docs;
      });

    if (checkIfUsernameIsTaken.length) {
      const response: Response = {
        status: 'DENIED',
        message: 'I am sorry, that username is already taken',
        updatedDocumentId: null,
        contextProfileId: context.profileId,
      };
      return response;
    }

    const id = uuid();

    // I should seed the database with some default circles
    // Then use the id from that here?
    const selectedStyle = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'DATA',
        creator: id,
        data: {},
      },
      context,
    );

    const rating = await createDocument(
      {
        collection: 'circles',
        type: 'LINES_TOTALED',
        creator: id,
        lines: [],
      },
      context,
    );

    const selectedUi = await createDocument(
      {
        collection: 'circles',
        type: 'LINES',
        creator: id,
        lines: [],
      },
      context,
    );

    const homePublic = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: id,
        lines: [],
      },
      context,
    );

    const homePrivate = await createDocument(
      {
        public: false,
        pii: true,
        collection: 'circles',
        type: 'LINES',
        creator: id,
        lines: [],
      },
      context,
    );

    const following = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: id,
        lines: [],
      },
      context,
    );

    const history = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: id,
        lines: [],
      },
      context,
    );

    const profile = {
      id,
      collection: 'profiles',
      username,
      canCreate: true,
      profileMedia: '',
      public: true,
      selectedStyle: selectedStyle.createdDocumentId,
      styleEnabled: false,
      rating: rating.createdDocumentId,
      uiEnabled: false,
      selectedUi: selectedUi.createdDocumentId,
      homePublic: homePublic.createdDocumentId,
      homePrivate: homePrivate.createdDocumentId,
      following: following.createdDocumentId,
      history: history.createdDocumentId,
    };

    // I need to add this to a user after created
    const createProfile = await createDocument(profile, context);

    const getUser = await getDocumentById('users', context.userId, context);

    const user = {
      id: context.userId,
      collection: 'users',
      profiles: [...getUser.profiles, createProfile.createdDocumentId],
    };

    // need to test this is working
    await updateDocumentById(user, context, true);

    return createProfile;
  } catch (error) {
    throw error;
  }
}
