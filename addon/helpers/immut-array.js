import Helper from '@ember/component/helper';
import { isArray, A as emberArray } from '@ember/array';
import { set, observer } from '@ember/object';

export default Helper.extend({
  compute([array]) {
    if (!isArray(array)) {
      return emberArray([array]);
    }

    set(this, 'array', array);
    return emberArray(array.slice(0));
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
