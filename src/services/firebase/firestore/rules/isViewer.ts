export const isViewer = (viewers: string[], viewer: string) => {
  return viewers && viewers.includes(viewer);
};
