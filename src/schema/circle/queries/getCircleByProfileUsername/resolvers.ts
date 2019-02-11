import firestore from '../../../../services/firebase/firestore';
import stackdriver from '../../../../services/stackdriver';
import { Context } from '../../../../customTypeScriptTypes/context';
import { defaultCircleSwitch } from '../../../../services/firebase/firestore/functions';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    getCircleByProfileUsername: async (
      _: null,
      args: {
        username: string;
      },
      context: Context,
    ) => {
      try {
        const username = args.username.toLowerCase();

        const query = await firestore
          .collection('profiles')
          .where('username', '==', username)
          .select('homePublic')
          .limit(1);

        const profile = await query.get().then((res: any) => {
          const results =
            res.docs.length && res.docs[0].data() ? res.docs[0].data() : null;
          return results;
        });

        if (profile.homePublic) {
          const getCircle = await getDocumentById(
            'circles',
            profile.homePublic,
            context,
          );
          return getCircle;
        } else {
          const circle = {
            type: 'DOES_NOT_EXIST',
          };
          return defaultCircleSwitch(circle, context);
        }
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
