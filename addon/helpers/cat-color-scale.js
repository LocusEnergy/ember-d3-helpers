import Ember from 'ember';
import {
  scaleOrdinal,
  schemeCategory10,
  schemeCategory20b,
  schemeCategory20c,
  schemeCategory20
} from 'd3-scale';

// import guidDomainScale from '../utils/guid-domain-scale';
const {
  assert,
  isPresent,
} = Ember;
const SCALES = {
  10: schemeCategory10,
  '20b': schemeCategory20b,
  '20c': schemeCategory20c,
  20: schemeCategory20,
};

export function catColorScale([type, domain]) {
  let capType = type.toString().toLowerCase();

  let catScale = SCALES[capType];
  assert(`${type} is not a valid sequential color scale name`, !!catScale);

  // let scale = guidDomainScale(catScale);

  let scale = scaleOrdinal(catScale);

  // If a domain was provided.
  if (isPresent(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(catColorScale);
