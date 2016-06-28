import Ember from 'ember';
import {
  scaleSequential,
  interpolateViridis,
  interpolateInferno,
  interpolateMagma,
  interpolatePlasma,
  interpolateWarm,
  interpolateCool,
  interpolateRainbow,
  interpolateCubehelixDefault
} from 'd3-scale';
const {
  assert,
  isPresent,
  String: { camelize, underscore },
} = Ember;

const SCALES = {
  viridis: interpolateViridis,
  inferno: interpolateInferno,
  magma: interpolateMagma,
  plasma: interpolatePlasma,
  warm: interpolateWarm,
  cool: interpolateCool,
  rainbow: interpolateRainbow,
  cubehelix: interpolateCubehelixDefault,
};

export function seqColorScale([type, domain]) {
  let capType = camelize(underscore(type.toString()).replace(/^interpolate/, ''));
  let interpolator = SCALES[capType];

  assert(`${capType} ${type} is not a valid sequential color interpolator, please see d3-scale for options`, isPresent(interpolator));

  let scale = scaleSequential(interpolator);

  // If a domain was provided.
  if (isPresent(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(seqColorScale);
