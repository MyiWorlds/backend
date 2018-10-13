import {
  isCreator,
  isEditor,
  isPublic,
  isRequestingUser,
  isUser
  } from '.';

export const userCanView = (document: any, context: Context) => {
  const { userId, selectedProfileId } = context;

  // if (userId !== queriedUserId) {
  //   return false;
  // }

  return (
    isPublic(document.public) ||
    isCreator(document.creator, selectedProfileId) ||
    isEditor(document.editors, selectedProfileId) ||
    isUser(document.users, selectedProfileId) ||
    isRequestingUser(document.id, userId) ||
    isRequestingUser(document.userId, userId)
  );
};
