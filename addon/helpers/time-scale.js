import { helper } from '@ember/component/helper';
import { scaleTime } from 'd3-scale';
import addOptionsToScale from '../utils/add-options-to-scale';

export function timeScale([domain, range], hash) {
  let scale = scaleTime();
  addOptionsToScale(scale, domain, range, hash);
  return scale;
}

export default helper(timeScale);
