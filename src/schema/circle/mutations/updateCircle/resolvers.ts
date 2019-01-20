import updateCircle from './updateCircle';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    updateCircle: async (
      _: null,
      args: { circle: Circle; merge: boolean },
      context: Context,
    ) => {
      return updateCircle(args.circle, args.merge, context);
    },
  },
  UpdateCircleResponse: {
    updatedCircle: async (response: any, _: null, context: Context) =>
      getDocumentById('circles', response.updatedDocumentId, context),
    creator: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.contextProfileId, context),
  },
};
