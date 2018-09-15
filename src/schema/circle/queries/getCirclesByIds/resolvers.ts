import getDocumentsByIds from '../../../../services/firebase/firestore/queries/getDocumentsByIds';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getCirclesByIds: async (_: null, args: { ids: string[] }, context) => {
      try {
        return await getDocumentsByIds('circles', args.ids, context.viewerId);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
