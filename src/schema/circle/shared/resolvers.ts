import firestore from './../../../services/firebase/firestore';
import stackdriver from './../../../services/stackdriver';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Circle: {
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
