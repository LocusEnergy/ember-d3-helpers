import Ember from 'ember';

export function d3Call([ callback, ...args ]) {
  return function(d3el) {
    return d3el.call(callback, ...args);
  };
}

export default Ember.Helper.helper(d3Call);
