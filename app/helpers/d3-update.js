import Ember from 'ember';

export function d3Update([callback]/*, hash*/) {
  return function(d3el) {
    return d3el.call(callback);
  };
}

export default Ember.Helper.helper(d3Update);
