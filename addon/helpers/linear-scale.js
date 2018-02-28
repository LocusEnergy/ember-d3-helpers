import { helper } from '@ember/component/helper';
import { scaleLinear } from 'd3-scale';
import addOptionsToScale from '../utils/add-options-to-scale';

export function linearScale([domain, range], hash) {
  let scale = scaleLinear();
  addOptionsToScale(scale, domain, range, hash);
  return scale;
}

export default helper(linearScale);
