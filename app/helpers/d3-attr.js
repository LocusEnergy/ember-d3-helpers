import Ember from 'ember';

export function d3Attr(params, hash) {
  return function(d3el) {
    if (params.length === 2) {
      let [key, value] = params;
      return d3el.attr(key, value);
    }
    return d3el.attr(hash);
  };
}

export default Ember.Helper.helper(d3Attr);
