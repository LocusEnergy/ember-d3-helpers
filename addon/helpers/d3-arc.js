import Ember from 'ember';
import { arc } from 'd3-shape';

export function d3Arc([ innerRadius, outerRadius ]) {
  return arc().outerRadius(outerRadius).innerRadius(innerRadius);
}

export default Ember.Helper.helper(d3Arc);
