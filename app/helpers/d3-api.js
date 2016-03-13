import Ember from 'ember';
import d3 from 'npm:d3';

export function d3Api([method, ...args]) {
  return function(data) {
    let a = Ember.isEmpty(data) ? [...args] : [data, ...args];
    return d3[method].apply(null, a);
  }
}

export default Ember.Helper.helper(d3Api);
