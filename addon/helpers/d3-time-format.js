import { helper } from '@ember/component/helper';
import { timeFormat } from 'd3-time-format';

export function d3TimeFormat([ specifier ]) {
  return timeFormat(specifier);
}

export default helper(d3TimeFormat);
