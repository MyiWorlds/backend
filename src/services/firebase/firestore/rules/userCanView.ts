import {
  isCreator,
  isEditor,
  isPublic,
  isRequestingUser,
  isUser
  } from '.';

export const userCanView = (document: any, context: Context) => {
  const { userId, profileId } = context;

  // if (userId !== queriedUserId) {
  //   return false;
  // }

  return (
    isPublic(document.public) ||
    isCreator(document.creator, profileId) ||
    isEditor(document.editors, profileId) ||
    isUser(document.users, profileId) ||
    isRequestingUser(document.id, userId) ||
    isRequestingUser(document.userId, userId)
  );
};
