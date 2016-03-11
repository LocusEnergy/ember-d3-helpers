import Ember from 'ember';
import d3 from 'npm:d3';

export function d3Axis([scale, orient]/*, hash*/) {
  return d3.svg.axis().scale(scale).orient(orient);
}

export default Ember.Helper.helper(d3Axis);
