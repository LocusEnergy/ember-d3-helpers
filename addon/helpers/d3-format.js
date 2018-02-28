import { helper } from '@ember/component/helper';
import { format } from 'd3-format';

export function d3Format([ specifier ]) {
  return format(specifier);
}

export default helper(d3Format);
