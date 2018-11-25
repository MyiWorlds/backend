import firestore from '../../../../services/firebase/firestore';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    createUser: async (
      _: null,
      args: {
        id: string;
        email: string;
      },
    ) => {
      try {
        const user = {
          id: args.id,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
          email: args.email,
        };

        await firestore
          .collection('users')
          .doc(user.id)
          .set(user);

        const createUserResponse = {
          status: 'SUCCESS',
          createdUser: user.id,
        };

        return createUserResponse;
      } catch (error) {
        stackdriver.report(error);
        return;
      }
    },
  },
};
