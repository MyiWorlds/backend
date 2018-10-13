import updateProfile from './updateProfile';
import { ResolverMap } from '../../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    updateProfile: async (
      _: null,
      args: {
        id: string;
        data: any;
      },
      context: Context,
    ) =>
      updateProfile(
        args.id,
        args.data.username,
        args.data.isDarkTheme,
        args.data.isMyTheme,
        args.data.isMyTypeStyles,
        context,
      ),
  },
};
