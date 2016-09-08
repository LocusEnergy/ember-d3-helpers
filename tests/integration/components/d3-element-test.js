import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-element', 'Integration | Component | d3 element', {
  integration: true
});

test('uses d3-graph to render elements', function(assert) {
  this.set('data', [ { q: 1 }, { q: 2 }, { q: 3 }])
  this.render(hbs`
    {{d3-element
      element-name='circle'
      selector='my_data'
      data=data
    }}
  `);

  assert.equal(this.$('circle').length, 3, 'renders data-joined elements');
});
