export const isEditor = (editors: string[], viewer: string) => {
  return editors && editors.includes(viewer);
};
