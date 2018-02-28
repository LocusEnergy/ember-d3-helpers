import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export function scaleValue([scale, ...args]) {
  assert('Scale must be a function', typeof scale === 'function');
  return scale(...args);
}

export default helper(scaleValue);
