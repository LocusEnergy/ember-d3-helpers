import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | d3-select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`
      {{d3-graph (pipe 
        (d3-call (pipe
          (d3-append "a")
          (d3-attr "id" "my-link")
        ))
        (d3-select "#my-link")
        (d3-attr "name" "fred")
      )}}
    `);

    assert.equal(this.$('#my-link').attr('name'), 'fred');
  });
});