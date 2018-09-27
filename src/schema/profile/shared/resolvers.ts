import { getDocumentById } from '../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Profile: {
    profileMedia: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.profileMedia, context),

    level: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.level, context),

    rating: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.rating, context),

    selectedUi: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.selectedUi, context),

    selectedStyle: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.selectedStyle, context),

    homePublic: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.homePublic, context),

    homePrivate: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.homePrivate, context),

    following: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.following, context),

    history: async (profile: any, _: null, context: Context) =>
      getDocumentById('circles', profile.history, context),
  },
};
