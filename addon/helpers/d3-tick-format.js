import Ember from 'ember';
import { timeFormat } from 'd3-time-format';

export function d3TickFormat([tickFormat]) {
  switch(typeof tickFormat) {
    case 'string':
      return timeFormat(tickFormat);
    case 'function':
      return tickFormat(timeFormat);
  }
  return null;
}

export default Ember.Helper.helper(d3TickFormat);
