import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import {
  scaleOrdinal,
  schemeCategory10,
  schemeCategory20b,
  schemeCategory20c,
  schemeCategory20
} from 'd3-scale';
import guidDomainScale from '../utils/guid-domain-scale';

const SCALES = {
  10: schemeCategory10,
  '20b': schemeCategory20b,
  '20c': schemeCategory20c,
  20: schemeCategory20,
};

export function catColorScale([type, domain]) {
  let capType = type.toString().toLowerCase();

  let catScheme = SCALES[capType];
  assert(`${type} is not a valid sequential color scale name`, !!catScheme);

  let scale = guidDomainScale(scaleOrdinal(catScheme));

  if (isPresent(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default helper(catColorScale);
