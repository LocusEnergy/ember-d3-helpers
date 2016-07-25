import Ember from 'ember';

export function d3TransitionDelay([amount]/*, hash*/) {
  return function(transition){
    return transition.delay(amount);
  };
}

export default Ember.Helper.helper(d3TransitionDelay);
