import Ember from 'ember';
import d3 from 'npm:d3';

export function d3Line([xScale, yScale]/*, hash*/) {
  return d3.svg.line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
}

export default Ember.Helper.helper(d3Line);
