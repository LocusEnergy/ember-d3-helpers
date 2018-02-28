import { helper } from '@ember/component/helper';

export function d3Noop() {
  return (d3el) => d3el;
}

export default helper(d3Noop);
