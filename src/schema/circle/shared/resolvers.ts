import firestore from './../../../services/firebase/firestore';
import stackdriver from './../../../services/stackdriver';
import { ResolverMap } from '../../../types/graphql-utils';
import {
  getDocumentById,
  getDocumentsByIds,
} from '../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  Circle: {
    parent: async (circle: any, _: null, context: Context) =>
      getDocumentById('circles', circle.parent, context),

    styles: async (circle: any, _: null, context: Context) =>
      getDocumentById('circles', circle.styles, context),

    rating: async (circle: any, _: null, context: Context) =>
      getDocumentById('circles', circle.rating, context),

    media: async (circle: any, _: null, context: Context) =>
      getDocumentById('circles', circle.media, context),

    creator: async (circle: any, _: null, context: Context) =>
      getDocumentById('circles', circle.creator, context),

    owner: async (circle: any, _: null, context: Context) =>
      getDocumentById('circles', circle.owner, context),

    viewers: async (circle: any, _: null, context: Context) =>
      getDocumentsByIds('profiles', circle.viewers, context),

    editors: async (circle: any, _: null, context: Context) =>
      getDocumentsByIds('profiles', circle.editors, context),

    lines: async (circle: any) => {
      let circles = [];

      if (typeof circle.lines[0] === 'string') {
        try {
          const ids = circle.lines.map((id: string) => {
            return firestore.doc(`circles/${id}`);
          });
          circles = await firestore.getAll(ids).then((circles2: any[]) => {
            return circles2.map((cir: any) => cir.data());
          });
        } catch (error) {
          stackdriver.report(error);
        }
      } else {
        circles = circle.lines;
      }

      return circles;
    },
  },
};
