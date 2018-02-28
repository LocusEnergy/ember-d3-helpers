import { helper } from '@ember/component/helper';

export function d3Call([ callback, ...args ]) {
  return function(d3el) {
    return d3el.call(callback, ...args);
  };
}

export default helper(d3Call);
