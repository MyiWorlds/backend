export const defaultCircleSwitch = (type: string, document: any) => {
  switch (type) {
    case 'PERMISSION_DENIED': {
      return {
        id: document.id,
        collection: document.collection,
        type,
        title: 'Sorry, you do not have the required permissions to see this.',
      };
    }

    case 'DOES_NOT_EXIST':
    default: {
      return {
        id: document.id,
        type,
      };
    }
  }
};
