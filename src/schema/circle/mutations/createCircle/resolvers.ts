import createDocument from '../../../../services/firebase/firestore/mutations/createDocument';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../types/graphql-utils';

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
        object: any;
        number: number;
        bigNumber: any;
        boolean: boolean;
        date: any;
        geoPoint: any;
        lines: [string];
      },
      context: Context,
    ) => {
      const userId = context;
      return createDocument(args, userId);
    },
  },
  CreateCircleResponse: {
    createdCircle: async (response: any, _: null, context: Context) =>
      getDocumentById('circles', response.createdDocumentId, context),
    creator: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.contextProfileId, context),
  },
};
