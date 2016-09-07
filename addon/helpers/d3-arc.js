import Ember from 'ember';
import { arc } from 'd3-shape';

const { isPresent } = Ember;

export function d3Arc([], { innerRadius, outerRadius, startAngle, endAngle }) {
  let arcFn = arc().outerRadius(outerRadius).innerRadius(innerRadius);
  if (isPresent(startAngle) && isPresent(endAngle)) {
    arcFn.startAngle(startAngle).endAngle(endAngle);
  }
  return arcFn;
}

export default Ember.Helper.helper(d3Arc);
