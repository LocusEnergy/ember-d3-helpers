import Ember from 'ember';

import { interpolate } from 'd3-interpolate';

function d3ArcTween([arc]) {
  return function arcTween(a) {
    var i = interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  };
}

export default Ember.Helper.helper(d3ArcTween);