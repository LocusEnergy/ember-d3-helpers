import { helper } from '@ember/component/helper';

export function d3Text([ callback ]) {
  return (d3el) => d3el.text(callback);
}

export default helper(d3Text);
