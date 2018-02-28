import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export function scaleTicks([ scale, ...args ]) {
  assert('The ticks helper must take a scale with a `ticks` function', scale && typeof scale.ticks === 'function');
  return scale.ticks.apply(scale, args);
}

export default helper(scaleTicks);
