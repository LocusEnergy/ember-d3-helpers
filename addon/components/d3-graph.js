import Ember from 'ember';
import { select } from 'd3-selection';
import layout from '../templates/components/d3-graph';

const {
  isNone
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'g',

  didInsertElement() {
    this._super(...arguments);

    let selection = this.get('selection');
    if (isNone(selection)) {
      Ember.run.scheduleOnce('afterRender', this, 'renderChart');
    }
  },

  renderChart() {
    let [ el ] = this.$().toArray();
    this.set('selection', select(el));
  }
}).reopenClass({
  positionalParams: ['graph']
});
