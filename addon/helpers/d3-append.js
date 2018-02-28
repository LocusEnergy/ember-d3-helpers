import { helper } from '@ember/component/helper';

export function d3Append([ selector ]) {
  return (d3el) => d3el.append(selector);
}

export default helper(d3Append);
