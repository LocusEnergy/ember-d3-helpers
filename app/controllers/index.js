import Ember from 'ember';
import { dailyData, weeklyDataA, weeklyDataB } from 'ember-d3-helpers/utils/timeseries';

const timeseries = [
  {
    id: 'ts_1',
    data: dailyData,
    datatype: 'Wh_sum',
    interval: 'daily'
  },
  {
    id: 'ts_2',
    data: weeklyDataA,
    datatype: 'Wh_sum',
    interval: 'weekly'
  },
  {
    id: 'ts_1',
    data: weeklyDataB,
    datatype: 'Wh_sum',
    interval: 'weekly'
  }
];

let id = 0;

let filterTimeseries = function(interval) {
  return timeseries.filterBy('interval', interval);
}

export default Ember.Controller.extend({
  data: [
    { r: 10, x: 10, y: 10, id: ++id },
    { r: 20, x: 30, y: 30, id: ++id },
    { r: 30, x: 65, y: 65, id: ++id }
  ],

  radius: 30,
  x: 120,
  y: 65,

  timeseriesData: filterTimeseries('daily'),

  actions: {
    addCircle(r) {
      let data = this.get('data');
      let x = parseInt(this.get('x'), 10);
      let y = this.get('y');
      ++id;
      data.pushObject({ r, x, y, id });
      this.setProperties({
        x: x + 2 * r,
        radius: r - 5
      });
    },
    removeCircle(item) {
      let data = this.get('data');
      data.removeObject(item);
    },
    switchTimeseries() {
      this.set('timeseriesData', timeseries.filterBy('interval', 'weekly'))
    }
  }
});
