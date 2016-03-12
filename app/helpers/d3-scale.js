import Ember from 'ember';
import d3 from 'npm:d3';

export function d3Scale([scaleType], { domain, range }) {
  let scale;
  if (Ember.isEqual(scaleType, 'time')) {
    scale = d3.time.scale();
  } else {
    scale = d3.call(scaleType);
  }
  return scale.domain(domain).range(range);
}

export default Ember.Helper.helper(d3Scale);
