import Ember from 'ember';

export function d3Append([selector]/*, hash*/) {
  return function(d3el) {
    return d3el.append(selector);
  };
}

export default Ember.Helper.helper(d3Append);
