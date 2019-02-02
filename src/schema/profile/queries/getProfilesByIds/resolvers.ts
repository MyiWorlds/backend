import stackdriver from '../../../../services/stackdriver';
import { getDocumentsByIds } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getProfilesByIds: async (
      _: null,
      args: { ids: string[] },
      context: Context,
    ) => {
      if (args.ids.length && context.validated) {
        try {
          const profiles = await getDocumentsByIds(
            'profiles',
            args.ids,
            context,
          );

          return profiles;
        } catch (error) {
          stackdriver.report(error);
          return [];
        }
      } else {
        return [];
      }
    },
  },
};
