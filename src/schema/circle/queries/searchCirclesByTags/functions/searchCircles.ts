import circleSwitch from './circleSwitch';
import { Context } from '../../../../../customTypeScriptTypes/context';

export default async function searchCircles(
  circle: SearchCircle,
  context: Context,
) {
  circle = await circleSwitch(circle, context);

  return circle;
}
