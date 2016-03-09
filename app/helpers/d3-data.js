import Ember from 'ember';

export function d3Data([data]/*, hash*/) {
  return function(d3el) {
    return d3el.data(data);
  };
}

export default Ember.Helper.helper(d3Data);
