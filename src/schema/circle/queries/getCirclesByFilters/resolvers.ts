import getDocumentsByFilters from '../../../../services/firebase/firestore/queries/getDocumentsByFilters';
import stackdriver from '../../../../services/stackdriver';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

interface Filter {
  property: string;
  condition: string;
  value: any;
}

export const resolvers: ResolverMap = {
  Query: {
    getCirclesByFilters: async (
      _: null,
      args: {
        numberOfResults: number;
        filters: Filter[];
        orderBy: {
          property: string;
          ascending: boolean;
        };
        cursor: any | null;
      },
      context: Context,
    ) => {
      try {
        return await getDocumentsByFilters(
          'circles',
          args.filters,
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
