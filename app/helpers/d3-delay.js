import Ember from 'ember';

export function d3Delay([duration]/*, hash*/) {
  return function(d3el){
    return d3el.delay(duration);
  };
}

export default Ember.Helper.helper(d3Delay);
