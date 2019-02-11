import updateProfile from './updateProfile';
import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

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
        args.data.addToHistory,
        context,
      ),
  },
  UpdateProfileResponse: {
    updatedProfile: async (response: any, _: null, context: Context) =>
      getDocumentById('profiles', response.updatedDocumentId, context),
  },
};
