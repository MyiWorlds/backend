import * as DataLoader from 'dataloader';
import firestore from './services/firebase/firestore/index';
import getUserId from './services/firebase/authentication/getUserId';
import stackdriver from './services/stackdriver';
import { ApolloServer } from 'apollo-server';
import { genSchema } from './utils/genSchema';
import { getDocumentsByIds } from './services/firebase/firestore/queries';
import 'dotenv/config';

export const startServer = async () => {
  const playground: any = {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'block',
    },
  };

  const server = new ApolloServer({
    schema: genSchema() as any,
    playground,
    introspection: true,
    context: async ({ req }: { req: any }) => {
      const headers = {
        userId: await getUserId(req.headers.token),
        queriedUserId: req.headers['user-id'],
        selectedProfileId: req.headers['selected-profile-id'],
        validated: false,
      };

      if (
        headers.userId &&
        (headers.queriedUserId === 'null' || headers.queriedUserId === '')
      ) {
        const user = await firestore
          .doc(`users/${headers.userId}`)
          .get()
          .then((result: any) => result.data());

        headers.queriedUserId = user.id;
      }

      if (headers.userId === headers.queriedUserId) {
        headers.validated = true;
      } else {
        headers.userId = null;
        headers.queriedUserId = null;
        headers.selectedProfileId = null;
      }

      const context = {
        ...headers,
        circleLoader: new DataLoader(async (keys: string[]) =>
          getDocumentsByIds('circles', keys, headers),
        ),
        profileLoader: new DataLoader(async (keys: string[]) =>
          getDocumentsByIds('profiles', keys, headers),
        ),
      };

      return context;
    },
    formatError: (error: any) => {
      return stackdriver.report(new Error(error));
    },
  });

  const app = await server
    .listen({ port: process.env.PORT || 8000 })
    .then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url}`);
    });

  return app;
};
