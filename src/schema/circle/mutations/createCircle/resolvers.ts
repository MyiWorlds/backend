import createCircle from './createCircle';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    createCircle: async (
      _: null,
      args: {
        id: string;
        collection: string;
        pii: boolean;
        parent: string;
        slug: string;
        public: boolean;
        passwordRequired: boolean;
        type: string;
        settings: JSON;
        styles: string;
        rating: string;
        tags: [string];
        title: string;
        subtitle: string;
        description: string;
        media: string;
        icon: string;
        creator: string;
        users: [string];
        editors: [string];
        dateCreated: any;
        dateUpdated: any;
        string: string;
        data: JSON;
        number: number;
        bigNumber: any;
        boolean: boolean;
        date: any;
        geoPoint: any;
        lines: [string];
      },
      context: Context,
    ) => {
      return createCircle(args, context);
    },
  },
  CreateCircleResponse: {
    createdCircle: async (response: any, _: null, context: Context) =>
      getDocumentById('circles', response.createdDocumentId, context),
    creator: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.contextProfileId, context),
  },
};
