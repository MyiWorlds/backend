import isUsernameTaken from '../shared/isUsernameTaken';
import updateDocumentById from '../../../../services/firebase/firestore/mutations/updateDocumentById';
import { isAllowedUsername } from '../shared/isAllowedUsername';

interface Response {
  status: string;
  message: string;
  updatedDocumentId: string | null;
  contextProfileId: string;
}

// This should be in a cloud function
export default async function updateProfile(
  id: string,
  username: string | undefined,
  isDarkTheme: boolean | undefined,
  isMyTheme: boolean | undefined,
  isMyTypeStyles: boolean | undefined,
  addToHistory: boolean | undefined,
  context: Context,
) {
  try {
    if (username) {
      username = username.toLocaleLowerCase();

      if (!isAllowedUsername(username)) {
        const response: Response = {
          status: 'DENIED',
          message:
            'I am sorry, I can not let you use that username.  Please try another',
          updatedDocumentId: null,
          contextProfileId: context.selectedProfileId,
        };
        return response;
      }

      if (await isUsernameTaken(username)) {
        const response: Response = {
          status: 'DENIED',
          message: 'I am sorry, that username is already taken',
          updatedDocumentId: null,
          contextProfileId: context.selectedProfileId,
        };
        return response;
      }
    }

    const profile: any = {
      id,
      collection: 'profiles',
      username,
      isDarkTheme,
      isMyTheme,
      isMyTypeStyles,
      addToHistory,
    };

    const profileCleaned = [
      Object.keys(profile).forEach(
        (key: string) => profile[key] === undefined && delete profile[key],
      ),
      profile,
    ][1];

    return await updateDocumentById(profileCleaned, context, true);
  } catch (error) {
    throw error;
  }
}
