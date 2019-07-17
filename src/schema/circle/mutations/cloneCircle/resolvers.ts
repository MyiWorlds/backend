import cloneCircle from './cloneCircle';
import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ICloneCircleResponse } from './cloneCircleTypes';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    cloneCircle: async (
      _: null,
      args: {
        id: string;
      },
      context: Context,
    ) => {
      return cloneCircle(args.id, context);
    },
  },
  CloneCircleResponse: {
    clonedCircle: (response: ICloneCircleResponse, _: null, context: Context) =>
      response.clonedCircleId
        ? getDocumentById('circles', response.clonedCircleId, context)
        : null,
  },
};
