import firestore from './services/firebase/firestore/index';
import getUserId from './services/firebase/authentication/getUserId';
import stackdriver from './services/stackdriver';
import { ApolloServer } from 'apollo-server';
import { genSchema } from './utils/genSchema';
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

      if (headers.userId && headers.queriedUserId === 'null') {
        const user = await firestore
          .doc(`users/${headers.userId}`)
          .get()
          .then((result: any) => result.data());

        headers.queriedUserId = user.id;
        headers.selectedProfileId = user.profiles[0].id;
      }

      if (headers.userId === headers.queriedUserId) {
        headers.validated = true;
      } else {
        headers.userId = null;
        headers.queriedUserId = null;
        headers.selectedProfileId = null;
      }

      return headers;
    },
    formatError: (error: any) => {
      return stackdriver.report(new Error(error));
    },
  });

  const app = await server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url}`);
    });

  return app;
};
