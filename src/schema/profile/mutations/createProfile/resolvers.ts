import firestore from '../../../../services/firebase/firestore';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    createProfile: async (
      _: null,
      args: {
        id: string;
        email: string;
      },
      context: Context,
    ) => {
      try {
        const profile = {
          id: args.id,
          creator: context.profileId,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
          email: args.email,
        };

        await firestore
          .collection('profiles')
          .doc(profile.id)
          .set(profile);

        const createProfileResponse = {
          status: 'SUCCESS',
          createdProfile: profile.id,
        };

        return createProfileResponse;
      } catch (error) {
        stackdriver.report(error);
        return;
      }
    },
  },
};
