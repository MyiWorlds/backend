import stackdriver from '../../../../services/stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { getDocumentsByFilters } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getCirclesByFilters: async (
      _: null,
      args: {
        numberOfResults: number;
        filters: IFilter[];
        selectFields: string[];
        orderBy: IOrderBy;
        cursor: any | null;
      },
      context: Context,
    ) => {
      try {
        return await getDocumentsByFilters(
          'circles',
          args.filters,
          args.selectFields,
          args.orderBy,
          args.numberOfResults,
          args.cursor,
          context,
        );
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
