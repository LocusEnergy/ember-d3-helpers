import Ember from 'ember';
import { pie } from 'd3-shape';

let genericSort = (a, b) => a - b;

export function d3Pie(params, { sortFn=genericSort, valueFn }) {
  return pie().sortValues(sortFn).value(valueFn);
}

export default Ember.Helper.helper(d3Pie);
