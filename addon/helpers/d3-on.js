import { helper } from '@ember/component/helper';

export function d3On([ typenames, listener, capture=false ]) {
  return function(d3el) {
    return d3el.on(typenames, listener, capture);
  };
}

export default helper(d3On);
