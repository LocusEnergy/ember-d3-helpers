import Ember from 'ember';

export function d3Noop(/*params, hash*/) {
  return function(d3el){
    return d3el;
  };
}

export default Ember.Helper.helper(d3Noop);
