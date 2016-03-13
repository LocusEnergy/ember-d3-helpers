import Ember from 'ember';
import d3 from 'npm:d3';
import _ from 'npm:lodash'
import computed from 'ember-computed-decorators';

const { extent, keys, max, min } = d3;
const { computed: compute, isEqual } = Ember;
const DATETIME_FORMAT = '%Y-%m-%dT%H:%M:%S';
const TIMESTAMP_KEY = 'ts';

let getIndependentValue = (d) => d[0];
let getDependentValue = (d) => d[1];
let isNotTimestamp = (k) => !isEqual(k, TIMESTAMP_KEY);
let dateFormatFn = d3.time.format.iso.parse;
let orderedPair = (d, yKey) => [dateFormatFn(d[TIMESTAMP_KEY]), d[yKey]];
let parseTimeseries = ({ id, data, datatype: yKey }) => {
  let timeseries = data.map(d => orderedPair(d, yKey));
  return { id, timeseries }
};

let getDomains = (t) => extent(t, getIndependentValue);
let colorFn = d3.scale.category20();

const D3Container = Ember.Component.extend({
  classNames: ['d3-container'],
  tagName: 'svg',

  rawWidth: 960,
  rawHeight: 500,
  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
  },

  didInsertElement() {
    if (this.get('timeseries.length') > 1) {
      Ember.assert('All dataseries must have the same beginning and end timestamps', _.isEqual(...this.get('domains')));
    }
    let { top, right, bottom, left } = this.get('margin');
    let width = this.get('width') + left + right;
    let height = this.get('height') + top + bottom;
    let viewBoxDimensions = `0 0 ${width} ${height}`;

    let [ el ] = this.$().toArray();
    d3.select(el)
      .attr('viewBox', viewBoxDimensions)
      // .attr('preserveAspectRatio', 'xMidYMid meet')
  },

  /**
  * width computed property
  * @param {Number} rawWidth
  * @param {Object} margin
  * @returns {Number}
  */

  @computed('rawWidth', 'margin')
  width(rawWidth, { left, right }) { return rawWidth - left - right; },

  /**
  * height computed property
  * @param {Number} rawHeight
  * @param {Object} margin
  * @returns {Number}
  */

  @computed('rawHeight', 'margin')
  height(rawHeight, { top, bottom }) { return rawHeight - top - bottom; },

  /**
  * returns array of timeseries data formatted for the accessors in D3 SVG Line method
  * @param {Array} data
  * @returns {Array}
  */
  d3data: compute.map('data', parseTimeseries),
  timeseries: compute.mapBy('d3data', 'timeseries'),
  domains: compute.map('timeseries', getDomains),
  domain: compute.alias('domains.firstObject'),

  color: colorFn
});

D3Container.reopenClass({
  positionalParams: ['data']
});

export default D3Container;
