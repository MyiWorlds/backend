import firestore from '../../../services/firebase/firestore';
import stackdriver from '../../../services/stackdriver';
import { getDocumentsByIds } from '../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    user: async (_: null, __: null, context: Context) => {
      try {
        const userDoc = await firestore.doc(`users/${context.userId}`).get();
        // const user = userDoc.data() as User | undefined;
        const user = userDoc.data();
        return user;
      } catch (error) {
        stackdriver.report(error);
      }
    },
  },
  User: {
    profiles: async (user: any, _: null, context: Context) => {
      try {
        return await getDocumentsByIds('profiles', user.profiles, context);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
