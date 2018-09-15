import firestore from '../../../../services/firebase/firestore';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getUserPublicById: async (_: null, args: { id: string }) => {
      try {
        const userDoc = await firestore.doc(`users/${args.id}`).get();
        // const user = userDoc.data() as User | undefined;
        const user = userDoc.data();
        return user;
      } catch (error) {
        stackdriver.report(error);
      }
    },
  },
};
