import Ember from 'ember';

export function d3Data(params/*, hash*/) {
  return function(selection){
    return selection.data(...params);
  };
}

export default Ember.Helper.helper(d3Data);
