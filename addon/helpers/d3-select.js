import Ember from 'ember';
import { select } from 'd3-selection';

export function d3Select([selector]/*, hash*/) {
  return function() {
    return select(selector);
  };
}

export default Ember.Helper.helper(d3Select);
