import stackdriver from '../../../../services/stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentsByFilters } from '../../../../services/firebase/firestore/queries';
import { GraphQLResolveInfo } from 'graphql';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getCirclesByFilters: async (
      _: null,
      args: {
        numberOfResults: number;
        filters: IFilter[];
        orderBy: IOrderBy;
        cursor: any | null;
        selectFields: string[];
      },
      context: Context,
      info: GraphQLResolveInfo,
    ) => {
      try {
        return await getDocumentsByFilters(
          'circles',
          args.filters,
          args.orderBy,
          args.numberOfResults,
          args.cursor,
          context,
          info,
          args.selectFields,
        );
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
