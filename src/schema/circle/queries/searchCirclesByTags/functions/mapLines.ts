import circleSwitch from './circleSwitch';
import { Context } from '../../../../../customTypeScriptTypes/context';

const mapLines = async (circle: SearchCircle, context: Context) => {
  circle.lines = await Promise.all(
    circle.lines.map(async circleChild => circleSwitch(circleChild, context)),
  );

  return circle;
};

export default mapLines;
