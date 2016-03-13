import Ember from 'ember';
import d3 from 'npm:d3';

export function d3Extent([callback]) {
  return function(data) {
    return d3.extent(data, callback);
  }
}

export default Ember.Helper.helper(d3Extent);
