import Ember from 'ember';

export function d3Remove(/*params, hash*/) {
  return function(d3el){
    return d3el.remove();
  };
}

export default Ember.Helper.helper(d3Remove);
