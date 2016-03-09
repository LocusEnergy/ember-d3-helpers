import Ember from 'ember';

export function d3On([event, action]/*, hash*/) {
  return function(d3el){
    return d3el.on(event, action);
  };
}

export default Ember.Helper.helper(d3On);
