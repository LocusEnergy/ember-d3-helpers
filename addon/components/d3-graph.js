import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { select } from 'd3-selection';
import layout from '../templates/components/d3-graph';

export default Component.extend({
  layout,
  tagName: 'g',

  didInsertElement() {
    this._super(...arguments);

    let selection = this.get('selection');
    if (isNone(selection)) {
      scheduleOnce('afterRender', this, 'renderChart');
    }
  },

  renderChart() {
    let [ el ] = this.$().toArray();
    this.set('selection', select(el));
  }
}).reopenClass({
  positionalParams: ['graph']
});
