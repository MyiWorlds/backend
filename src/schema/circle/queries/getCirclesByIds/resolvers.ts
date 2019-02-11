import stackdriver from '../../../../services/stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentsByIds } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getCirclesByIds: async (
      _: null,
      args: { ids: string[] },
      context: Context,
    ) => {
      try {
        return await getDocumentsByIds('circles', args.ids, context);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
