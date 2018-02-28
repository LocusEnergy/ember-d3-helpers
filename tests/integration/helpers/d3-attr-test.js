import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | d3-attr', function(hooks) {
  setupRenderingTest(hooks);

  test('applies attribute to selection', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{d3-graph (pipe
        (d3-attr "name" "applied")
      )}}
    `);

    assert.equal(this.$('g').attr('name'), 'applied');
  });

  test('updates element when bound property changes', async function(assert) {

    this.set('name', 'initial value');

    // Template block usage:
    await render(hbs`
      {{d3-graph (pipe
        (d3-attr "name" name)
      )}}
    `);

    assert.equal(this.$('g').attr('name'), 'initial value');

    this.set('name', 'updated value');

    assert.equal(this.$('g').attr('name'), 'updated value');
  });
});