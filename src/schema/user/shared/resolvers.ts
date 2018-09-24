import firestore from '../../../services/firebase/firestore';
import stackdriver from '../../../services/stackdriver';
import { ResolverMap } from '../../../types/graphql-utils';
import {
  getDocumentsByIds,
  getDocumentById,
} from '../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  Query: {
    user: async (_: null, __: null, context: Context) => {
      try {
        const userDoc = await firestore.doc(`users/${context.userId}`).get();
        // const user = userDoc.data() as User | undefined;
        const user = userDoc.data();
        return user;
      } catch (error) {
        stackdriver.report(error);
      }
    },
  },
  User: {
    profileMedia: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.profileMedia, context),

    levelTotal: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.levelTotal, context),

    balanceTotal: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.balanceTotal, context),

    ratingTotal: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.ratingTotal, context),

    uis: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.uis, context),

    styles: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.styles, context),

    inbox: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.inbox, context),

    search: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.search, context),

    profiles: async (user: any, _: null, context: Context) => {
      try {
        return await getDocumentsByIds('profiles', user.profiles, context);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
