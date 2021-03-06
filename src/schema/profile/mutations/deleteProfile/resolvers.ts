import deleteProfile from './deleteProfile';
import { Context } from '../../../../customTypeScriptTypes/context';
import { IDeleteProfileResponse } from './deleteProfileTypes.d';
import { ResolverMap } from '../../../../customTypeScriptTypes/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    deleteProfile: async (
      _: null,
      args: {
        id: string;
      },
      context: Context,
    ) => deleteProfile(args.id, context),
  },
  DeleteProfileResponse: {
    status: (response: IDeleteProfileResponse) => response.status,
    message: (response: IDeleteProfileResponse) => response.message,
    profileIdToDelete: (response: IDeleteProfileResponse) =>
      response.profileIdToDelete,
    profileDeleted: (response: IDeleteProfileResponse) =>
      response.profileDeleted,
    numberOfPiiCircles: (response: IDeleteProfileResponse) =>
      response.numberOfPiiCircles,
    piiCirclesDeleted: (response: IDeleteProfileResponse) =>
      response.piiCirclesDeleted,
    numberOfPiiCircleClones: (response: IDeleteProfileResponse) =>
      response.numberOfPiiCircleClones,
    piiCircleClonesDeleted: (response: IDeleteProfileResponse) =>
      response.piiCircleClonesDeleted,
    numberOfAppCreatedCirclesForProfile: (response: IDeleteProfileResponse) =>
      response.numberOfAppCreatedCirclesForProfile,
    appCreatedCirclesForProfileDeleted: (response: IDeleteProfileResponse) =>
      response.appCreatedCirclesForProfileDeleted,
    numberOfAppCreatedCircleClonesForProfile: (
      response: IDeleteProfileResponse,
    ) => response.numberOfAppCreatedCircleClonesForProfile,
    appCreatedCircleClonesForProfileDeleted: (
      response: IDeleteProfileResponse,
    ) => response.appCreatedCircleClonesForProfileDeleted,
  },
};
