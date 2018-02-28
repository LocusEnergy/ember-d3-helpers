import { helper } from '@ember/component/helper';
import { stack } from 'd3-shape';
import addOptionsToStack from '../utils/add-options-to-stack';

export function d3Stack( [ data, args ], hash={}) {
  return addOptionsToStack(stack(data, args), hash);
}

export default helper(d3Stack);
