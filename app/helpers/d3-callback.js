import Ember from 'ember';

export function d3Callback([callback, key]/*, hash*/) {
  return function(d) {
    return callback(d[key])
  };
}

export default Ember.Helper.helper(d3Callback);
