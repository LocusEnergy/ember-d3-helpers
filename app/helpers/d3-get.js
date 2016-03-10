import Ember from 'ember';

const {
  get
} = Ember;

export function d3Get([key]/*, hash*/) {
  return function(d){
    return get(d, key);
  };
}

export default Ember.Helper.helper(d3Get);
