import buildAndCreateProfile from './buildAndCreateProfile';
import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    createProfile: async (
      _: null,
      args: {
        username: string;
      },
      context: Context,
    ) => buildAndCreateProfile(args.username, context),
  },
  CreateProfileResponse: {
    createdProfile: async (response: any, _: null, context: Context) =>
      getDocumentById('profiles', response.createdDocumentId, context),
  },
};
