import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getCircleById: async (_: null, args: { id: string }, context) => {
      try {
        return await getDocumentById('circles', args.id, context.viewerId);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
