import { helper } from '@ember/component/helper';

export function d3Remove() {
  return function(d3el){
    return d3el.remove();
  };
}
export default helper(d3Remove);
