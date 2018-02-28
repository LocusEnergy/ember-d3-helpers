import { helper } from '@ember/component/helper';

export function d3Attr([ attribute, value ]) {
  return function(d3el) {
    return d3el.attr(attribute, value);
  };
}

export default helper(d3Attr);
