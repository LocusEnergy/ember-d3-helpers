import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { underscore, camelize } from '@ember/string';
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

export default helper(seqColorScale);
