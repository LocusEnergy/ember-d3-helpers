import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-container', 'Integration | Component | d3 container', {
  integration: true
});

let rawData = [
  {
    "ts":"2016-03-02T00:00:00-05:00",
    "Wh_sum":0.000
  },
  {
    "ts":"2016-03-02T01:00:00-05:00",
    "Wh_sum":0.000
  },
  {
    "ts":"2016-03-02T02:00:00-05:00",
    "Wh_sum":0.000
  }
];

test('basic functionality', function(assert) {
  this.render(hbs`{{d3-container}}`);

  assert.ok(this.$('svg').length, 'renders an SVG');
  this.set('q', [])

  this.render(hbs`
    {{#d3-container rawData as |chart|}}
      {{q}}
    {{/d3-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
