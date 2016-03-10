import Ember from 'ember';

export function d3Data([data, key]/*, hash*/) {
  return function(d3el) {
    return d3el.data(data, key);
  };
}

export default Ember.Helper.helper(d3Data);
