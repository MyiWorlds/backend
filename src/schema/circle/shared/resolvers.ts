import stackdriver from './../../../services/stackdriver';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Circle: {
    parent: async (circle: any, _: null, context: Context) => {
      if (circle.parent) {
        return context.circleLoader.load(circle.parent);
      } else {
        return null;
      }
    },
    styles: async (circle: any, _: null, context: Context) => {
      if (circle.styles) {
        return context.circleLoader.load(circle.styles);
      } else {
        return null;
      }
    },
    rating: async (circle: any, _: null, context: Context) => {
      if (circle.rating) {
        return context.circleLoader.load(circle.rating);
      } else {
        return null;
      }
    },
    media: async (circle: any, _: null, context: Context) => {
      if (circle.media) {
        return context.circleLoader.load(circle.media);
      } else {
        return null;
      }
    },
    creator: async (circle: any, _: null, context: Context) => {
      if (circle.creator) {
        return context.profileLoader.load(circle.creator);
      } else {
        return null;
      }
    },
    owner: async (circle: any, _: null, context: Context) => {
      if (circle.owner) {
        return context.profileLoader.load(circle.owner);
      } else {
        return null;
      }
    },
    viewers: async (circle: any, _: null, context: Context) => {
      if (circle.viewers.length) {
        return context.profileLoader.loadMany(circle.viewers);
      } else {
        return [];
      }
    },
    editors: async (circle: any, _: null, context: Context) => {
      if (circle.editors.length) {
        return context.profileLoader.loadMany(circle.editors);
      } else {
        return [];
      }
    },
    lines: async (circle: any, _: null, context: Context) => {
      if (circle.lines) {
        if (typeof circle.lines[0] === 'string') {
          try {
            return context.profileLoader.loadMany(circle.editors);
          } catch (error) {
            stackdriver.report(error);
          }
        } else {
          return circle.lines;
        }
      } else {
        return [];
      }
    },
  },
};
