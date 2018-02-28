import { helper } from '@ember/component/helper';

export function d3Style([ attribute, value ]) {
  return function(d3el) {
    return d3el.style(attribute, value);
  };
}

export default helper(d3Style);
