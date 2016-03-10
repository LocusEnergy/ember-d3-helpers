import Ember from 'ember';

export function d3Style(params, hash) {
  return function(d3el) {
    if (params.length === 2) {
      let [key, value] = params;
      return d3el.style(key, value);
    }
    return d3el.style(hash);
  };
}

export default Ember.Helper.helper(d3Style);
