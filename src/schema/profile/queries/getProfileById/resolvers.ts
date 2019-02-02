import firestore from '../../../../services/firebase/firestore';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getProfileById: async (_: null, args: { id: string }, context: Context) => {
      if (args.id !== 'null' && context.validated) {
        try {
          const profileDoc = await firestore.doc(`profiles/${args.id}`).get();
          const profile = profileDoc.data();

          return profile;
        } catch (error) {
          stackdriver.report(error);
        }
      } else {
        return null;
      }
    },
  },
};
