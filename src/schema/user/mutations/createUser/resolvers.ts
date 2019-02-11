import createUser from './createUser';
import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    createUser: async (
      _: null,
      args: {
        id: string;
        email: string;
      },
      context: Context,
    ) => createUser(args.id, args.email, context),
  },
  CreateUserResponse: {
    createdUser: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.createdDocumentId, context),
  },
};
