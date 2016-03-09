import Ember from 'ember';

export function invoke([callback, ...args]/*, hash*/) {
  callback.apply(null, args);
}

export default Ember.Helper.helper(invoke);
