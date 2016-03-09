import Ember from 'ember';

export function d3Enter([callback]/*, hash*/) {
  return function(d3el) {
    return d3el.enter().call(callback);
  };
}

export default Ember.Helper.helper(d3Enter);
