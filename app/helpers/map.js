import Ember from 'ember';

export function map([collection, callback]) {
  return collection.map(callback);
}

export default Ember.Helper.helper(map);
