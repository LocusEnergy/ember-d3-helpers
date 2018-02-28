import { helper } from '@ember/component/helper';

export function d3AttrTween([attr, callback]) {
  return function (d3sel) {
    return d3sel.attrTween(attr, callback);
  };
}

export default helper(d3AttrTween);