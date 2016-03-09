import Ember from 'ember';

export function d3Exit([callback]/*, hash*/) {
  return function(d3el) {
    return d3el.exit().call(callback);
  };
}

export default Ember.Helper.helper(d3Exit);
