export const defaultCircleSwitch = (circle: Circle, context: Context) => {
  const type = circle.type;
  const id = circle.id ? circle.id : null;
  switch (type) {
    case 'UPDATED':
    case 'CREATED':
    case 'VIEWED': {
      return {
        id: null,
        public: false,
        creator: context.selectedProfileId,
        parent: context.profileHistoryId,
        collection: 'circles',
        type,
        settings: {
          id: circle.settings.id,
          collection: circle.settings.collection,
        },
      };
    }
    case 'VIEWED_BY_IDS': {
      return {
        id: null,
        public: false,
        creator: context.selectedProfileId,
        parent: context.profileHistoryId,
        collection: 'circles',
        type,
        settings: {
          collection: circle.settings.collection,
          ids: circle.settings.ids,
        },
      };
    }
    case 'VIEWED_BY_FILTERS': {
      return {
        id: null,
        public: false,
        creator: context.selectedProfileId,
        parent: context.profileHistoryId,
        collection: 'circles',
        type,
        settings: {
          collection: circle.settings.collection,
          filters: circle.settings.filters,
          orderBy: circle.settings.orderBy,
          numberOfResults: circle.settings.numberOfResults,
          pageCursor: circle.settings.pageCursor,
        },
      };
    }
    case 'PERMISSION_DENIED': {
      return {
        id,
        collection: circle.collection || 'circles',
        type,
        title: 'Sorry, you do not have the required permissions to see this.',
      };
    }
    case 'DOES_NOT_EXIST':
    default: {
      return {
        id,
        collection: 'circles',
        type,
      };
    }
  }
};
