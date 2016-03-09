import Ember from 'ember';

export function d3SelectAll([selector] /*, hash*/) {
  return function(d3el) {
    return d3el.selectAll(selector);
  };
}

export default Ember.Helper.helper(d3SelectAll);
