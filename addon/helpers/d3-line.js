import { helper } from '@ember/component/helper';
import { line, curveBasis } from 'd3-shape';

export function d3Line([ xScale, yScale ], { xAccessor, yAccessor }) {
  let xFn = (d) => xScale(xAccessor(d));
  let yFn = (d) => yScale(yAccessor(d));
  return line().x(xFn).y(yFn).curve(curveBasis);
}

export default helper(d3Line);
