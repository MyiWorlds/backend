import searchCircles from './functions/searchCircles';
import stackdriver from '../../../../services/stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    searchCirclesByTags: async (
      _: null,
      args: {
        circle: SearchCircle;
      },
      context: Context,
    ) => {
      try {
        return await searchCircles(args.circle, context);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
