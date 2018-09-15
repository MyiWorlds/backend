import firestore from '../../../../services/firebase/firestore';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    createCircleWithId: async (
      _: null,
      args: {
        id: string;
      },
    ) => {
      try {
        const circle = {
          id: args.id,
          dateCreated: Date.now(),
        };

        await firestore
          .collection('circles')
          .doc(circle.id)
          .set(circle);

        const createCircleResponse = {
          status: 'SUCCESS',
          createdCircle: circle.id,
        };

        return createCircleResponse;
      } catch (error) {
        stackdriver.report(error);
        return;
      }
    },
  },
};
