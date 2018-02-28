import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | d3-on', function(hooks) {
  setupRenderingTest(hooks);

  test('adds a listener to each selected element', async function(assert) {
    assert.expect(4);

    const listener = () => {
      assert.ok(true, 'listener called');
    };

    this.set('data', ['car', 'car', 'boat', 'boat']);
    this.set('listener', listener);

    await render(hbs`
      {{d3-graph (pipe
        (d3-call (pipe
          (d3-select-all "i")
          (d3-data data)
          (d3-join enter=(pipe
            (d3-append "i")
            (d3-attr "class" (r/param))
          ))
        ))
        (d3-call (pipe
          (d3-select-all "i")
          (d3-on "click" listener)
        ))
      )}}
    `);

    this.$('i').each(function() {
      $(this).trigger('click');
    });
  });
});