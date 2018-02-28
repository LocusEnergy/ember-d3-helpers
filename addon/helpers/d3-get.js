import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export function d3Get([ key ]) {
  return function(d){
    if (!key) {
      return d;
    } else {
      return get(d, key);
    }
  };
}

export default helper(d3Get);
