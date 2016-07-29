import Ember from 'ember';
import { select } from 'd3-selection';
import layout from '../templates/components/d3-graph';

const {
  isNone,
  typeOf,
  defineProperty,
  computed: { oneWay }
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'g',

  init() {
    this._super(...arguments);
    let { _selection, _graph } = this.getProperties(['_selection', '_graph']);

    let isNested = _selection && _graph;
    if (isNested) {
      defineProperty(this, 'selection', oneWay('_selection'));
      defineProperty(this, 'graph', oneWay('_graph'));
      return;
    }

    if (isNone(_graph) && typeOf(_selection) === 'function') {
      defineProperty(this, 'graph', oneWay('_selection'));
      return;
    }
  },

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
  positionalParams: ['_selection', '_graph']
});
