import Ember from 'ember';

export function d3Transition([name]/*, hash*/) {
  return function(d3el){
    return d3el.transition(name);
  };
}

export default Ember.Helper.helper(d3Transition);
