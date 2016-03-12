import Ember from 'ember';
import d3 from 'npm:d3';
let getIndependentValue = (d) => d[0];

export function d3Extent([data, callback]/*, hash*/) {
  return d3.extent(data, callback)
}

export default Ember.Helper.helper(d3Extent);
