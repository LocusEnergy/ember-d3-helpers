import Ember from 'ember';
import d3 from 'npm:d3';

const D3Element = Ember.Component.extend({
  tagName: 'g',

  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, 'renderGraph');
  },

  renderGraph() {
    let [ el ] = this.$().toArray();
    this.set('d3el', d3.select(el));
  }
});

D3Element.reopenClass({
  positionalParams: ['callback', 'enter', 'update', 'exit']
});

export default D3Element;
