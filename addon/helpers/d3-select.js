import { helper } from '@ember/component/helper';
import { select } from 'd3-selection';

export function d3Select([selector]/*, hash*/) {
  return function() {
    return select(selector);
  };
}

export default helper(d3Select);
