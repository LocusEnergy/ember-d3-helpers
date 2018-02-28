import { helper } from '@ember/component/helper';

export function d3Data(params) {
  return function(selection){
    return selection.data(...params);
  };
}

export default helper(d3Data);
