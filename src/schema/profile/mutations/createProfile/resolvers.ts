import buildAndCreateProfile from './buildAndCreateProfile';
import { ResolverMap } from '../../../../types/graphql-utils';

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
};
