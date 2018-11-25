import Context from './Context';
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
    context: ({ req }: { req: any }) => Context(req),
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
