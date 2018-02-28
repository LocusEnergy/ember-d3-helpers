import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { A } from '@ember/array';
import array from 'd3-array';

let allowedMethods = A(['min', 'max', 'extent', 'sum', 'mean', 'median', 'variance', 'deviation', 'scan', 'merge', 'pairs', 'permute']);

export function d3Array([ method, ...args ]) {
  assert('this method is not yet supported', allowedMethods.includes(method));

  let arrayMethod = array[method];
  return arrayMethod.apply(null, args);
}

export default helper(d3Array);
