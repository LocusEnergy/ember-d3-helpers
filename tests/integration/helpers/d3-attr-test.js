import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-attr', 'Integration | Helper | d3-attr', {
  integration: true
});

test('applies attribute to selection', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{d3-graph (pipe
      (d3-attr "name" "applied")
    )}}
  `);

  assert.equal(this.$('g').attr('name'), 'applied');
});

test('updates element when bound property changes', function(assert){

  this.set('name', 'initial value');

  // Template block usage:
  this.render(hbs`
    {{d3-graph (pipe
      (d3-attr "name" name)
    )}}
  `);

  assert.equal(this.$('g').attr('name'), 'initial value');

  this.set('name', 'updated value');

  assert.equal(this.$('g').attr('name'), 'updated value');
});
