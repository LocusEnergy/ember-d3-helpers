import Ember from 'ember';

export function d3Join(params, { enter, update, exit }) {
  return function(selection){

    if (update) {
      update(selection);
    }

    if (enter) {
      selection.enter().call(enter);
    }

    if (exit) {
      selection.exit().call(exit);
    }

    return selection;
  };
}

export default Ember.Helper.helper(d3Join);
