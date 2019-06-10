import circleSwitch from './circleSwitch';
import { Context } from '../../../../../customTypeScriptTypes/context';
import { SearchCircle } from '../../../../../customTypeScriptTypes/circle';

export default async function searchCircles(
  circle: SearchCircle,
  context: Context,
) {
  circle = await circleSwitch(circle, context);

  return circle;
}
