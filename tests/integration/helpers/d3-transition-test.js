import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | d3-transition', function(hooks) {
  setupRenderingTest(hooks);

  import Ember from 'ember';

  const {
    run: { later }
  } = Ember;

  test('is applied to selection', async function(assert) {
    assert.expect(1);

    // Template block usage:
    await render(hbs`
      {{d3-graph (pipe 
        (d3-transition)
        (d3-style "color" "red")
      )}}
    `);

    // wait for transition
    later(()=> {}, 250);

    return settled().then(() => {
      assert.equal(this.$('g').attr('style'), 'color: rgb(255, 0, 0);');
    });
  });
});