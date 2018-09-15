import {
  isCreator,
  isEditor,
  isPublic,
  isRequestingUser,
  isViewer
  } from '.';

export const viewerCanView = (document: any, contextViewerId: string) => {
  return (
    isPublic(document.public) ||
    isCreator(document.creator, contextViewerId) ||
    isEditor(document.editors, contextViewerId) ||
    isRequestingUser(document.id, contextViewerId) ||
    isRequestingUser(document.userId, contextViewerId) ||
    isViewer(document.viewers, contextViewerId)
  );
};
