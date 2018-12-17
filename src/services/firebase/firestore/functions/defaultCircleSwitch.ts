// TODO: Rename to circleAssembler

export const defaultCircleSwitch = (circle: Circle, context: Context) => {
  const type = circle.type;
  const id = circle.id ? circle.id : null;

  if (circle.cached) {
    return circle.cache;
  } else {
    const header = {
      id,
      collection: circle.collection || 'circles',
      title: circle.title || '',
      type,
    };

    switch (type) {
      case 'UPDATED':
      case 'CREATED':
      case 'VIEWED': {
        circle = {
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
        break;
      }
      case 'VIEWED_BY_IDS': {
        circle = {
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
        break;
      }
      case 'VIEWED_BY_FILTERS': {
        circle = {
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
        break;
      }
      case 'INTERFACE': {
        circle = {
          ...header,
          line: circle.line || null,
        };
        break;
      }
      case 'PERMISSION_DENIED': {
        circle = {
          id,
          collection: circle.collection || 'circles',
          type,
          title: 'Sorry, you do not have the required permissions to see this.',
        };
        break;
      }
      case 'DOES_NOT_EXIST':
      default: {
        circle = {
          id,
          collection: 'circles',
          type,
        };
        break;
      }
    }
    return circle;
  }
};
