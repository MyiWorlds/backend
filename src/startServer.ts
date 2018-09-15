import getViewerId from './services/firebase/authentication/getViewerId';
import stackdriver from './services/stackdriver';
import { ApolloServer } from 'apollo-server';
import { genSchema } from './utils/genSchema';
import 'dotenv/config';

export const startServer = async () => {
  const server = new ApolloServer({
    schema: genSchema() as any,
    introspection: true,
    context: async ({ req }: { req: any }) => ({
      viewerId: await getViewerId(req.headers.token),
    }),
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
