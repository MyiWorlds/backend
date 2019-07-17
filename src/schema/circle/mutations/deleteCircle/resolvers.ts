import deleteCircle from './deleteCircle';
import { Context } from '../../../../customTypeScriptTypes/context';
import { IDeleteCircleResponse } from './deleteCircleTypes.d';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    deleteCircle: async (
      _: null,
      args: {
        id: string;
      },
      context: Context,
    ) => deleteCircle(args.id, context),
  },
  DeleteCircleResponse: {
    status: (response: IDeleteCircleResponse) => response.status,
    message: (response: IDeleteCircleResponse) => response.message,
    circleIdToDelete: (response: IDeleteCircleResponse) =>
      response.circleIdToDelete,
    circleDeleted: (response: IDeleteCircleResponse) => response.circleDeleted,
    numberOfPiiCircleClones: (response: IDeleteCircleResponse) =>
      response.numberOfPiiCircleClones,
    piiCircleClonesDeleted: (response: IDeleteCircleResponse) =>
      response.piiCircleClonesDeleted,
  },
};
