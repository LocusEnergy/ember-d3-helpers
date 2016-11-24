import Ember from 'ember';
import { stack } from 'd3-shape';
import addOptionsToStack from '../utils/add-options-to-stack';

export function d3Stack( [ data, args ], hash={}) {
  return addOptionsToStack(stack(data, args), hash);
}

export default Ember.Helper.helper(d3Stack);
