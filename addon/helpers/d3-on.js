import Ember from 'ember';

export function d3On([ typenames, listener, capture=false ]) {
  return function(d3el) {
    return d3el.on(typenames, listener, capture);
  };
}

export default Ember.Helper.helper(d3On);
