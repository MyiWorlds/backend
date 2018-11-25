import getEntitiesAndRemoveInvalid from './getEntitiesAndRemoveInvalid';
import mapLines from './mapLines';

const circleSwitch = async (circle, contextProfileId) => {
  switch (circle.type) {
    // case 'QUERY': {
    //   circle = await getEntitiesAndRemoveInvalid(circle, contextProfileId);
    //   return circle;
    // }

    // case 'QUERIES':
    // case 'LINES': {
    //   circle = await mapLines(circle, contextProfileId);
    //   return circle;
    // }

    default: {
      return circle;
    }
  }
};

export default circleSwitch;
