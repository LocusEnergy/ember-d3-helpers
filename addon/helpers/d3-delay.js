import { helper } from '@ember/component/helper';

export function d3Delay([amount]/*, hash*/) {
  return function(transition){
    return transition.delay(amount);
  };
}

export default helper(d3Delay);
