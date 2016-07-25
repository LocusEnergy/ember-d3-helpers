import Ember from 'ember';

export function d3AttrTween([attr, callback]) {
  return function (d3sel) {
    return d3sel.attrTween(attr, callback);
  };
}

export default Ember.Helper.helper(d3AttrTween);