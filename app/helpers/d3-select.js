import Ember from 'ember';

export function d3Select([ d3el, callback ]/*, hash*/) {
  callback(d3el.selectAll());
}

export default Ember.Helper.helper(d3Select);
