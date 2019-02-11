import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getCircleById: async (_: null, args: { id: string }, context: Context) =>
      getDocumentById('circles', args.id, context),
  },
};
