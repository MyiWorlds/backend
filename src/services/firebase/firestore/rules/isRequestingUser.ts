export const isRequestingUser = (docId: string, viewer: string) => {
  return docId === viewer;
};
