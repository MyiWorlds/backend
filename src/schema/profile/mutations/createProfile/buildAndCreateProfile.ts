import createDocument from '../../../../services/firebase/firestore/mutations/createDocument';
import firestore from './../../../../services/firebase/firestore/index';
import isUsernameTaken from '../shared/isUsernameTaken';
import updateDocumentById from '../../../../services/firebase/firestore/mutations/updateDocumentById';
import { isAllowedUsername } from '../shared/isAllowedUsername';

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
      contextProfileId: context.selectedProfileId,
    };
    return response;
  }

  try {
    if (await isUsernameTaken(username)) {
      const response: Response = {
        status: 'DENIED',
        message: 'I am sorry, that username is already taken',
        updatedDocumentId: null,
        contextProfileId: context.selectedProfileId,
      };
      return response;
    }

    const profileRef = firestore.collection('profiles').doc();
    const id = profileRef.id;

    const level = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        editors: [id],
        data: {},
      },
      context,
    );

    const rating = await createDocument(
      {
        collection: 'circles',
        type: 'LINES_TOTALED',
        creator: 'APP',
        editors: [id],
        lines: [],
      },
      context,
    );

    const myTypeStyles = await createDocument(
      {
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        editors: [id],
        lines: [],
      },
      context,
    );

    const myTheme = await createDocument(
      {
        collection: 'circles',
        type: 'DATA',
        creator: 'APP',
        editors: [id],
        data: {
          palette: {
            primary: {
              main: '#2196F3',
            },
            secondary: {
              main: '#f44336',
            },
          },
        },
      },
      context,
    );

    const homePublic = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        editors: [id],
        lines: [],
      },
      context,
    );

    const home = await createDocument(
      {
        public: false,
        pii: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        editors: [id],
        lines: [],
      },
      context,
    );

    const following = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        editors: [id],
        lines: [],
      },
      context,
    );

    const history = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        editors: [id],
        lines: [],
      },
      context,
    );

    const profile = {
      id,
      collection: 'profiles',
      public: true,
      username,
      canCreate: true,
      profileMedia: '',
      level: level.createdDocumentId,
      rating: rating.createdDocumentId,
      isDarkTheme: true,
      isMyTypeStyles: false,
      myTypeStyles: myTypeStyles.createdDocumentId,
      isMyTheme: false,
      myTheme: myTheme.createdDocumentId,
      homePublic: homePublic.createdDocumentId,
      home: home.createdDocumentId,
      following: following.createdDocumentId,
      history: history.createdDocumentId,
    };

    const createProfile = await createDocument(profile, context);

    const getUser = await firestore
      .collection('users')
      .doc(context.userId)
      .get()
      .then((res: any) => res.data());

    const user = {
      id: context.userId,
      collection: 'users',
      profiles:
        getUser.profiles && getUser.profiles.length
          ? [...getUser.profiles, createProfile.createdDocumentId]
          : [createProfile.createdDocumentId],
    };

    await updateDocumentById(user, context, true);

    return createProfile;
  } catch (error) {
    throw error;
  }
}
