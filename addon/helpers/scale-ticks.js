import Ember from 'ember';
const { assert } = Ember;

export function scaleTicks([ scale, ...args ]) {
  assert('The ticks helper must take a scale with a `ticks` function', scale && typeof scale.ticks === 'function');
  return scale.ticks.apply(scale, args);
}

export default Ember.Helper.helper(scaleTicks);
