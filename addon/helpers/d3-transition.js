import { helper } from '@ember/component/helper';

export function d3Transition([ transition ]) {
  return function(d3el){
    return d3el.transition(transition);
  };
}

export default helper(d3Transition);
