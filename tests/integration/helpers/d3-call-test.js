import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | d3-call', function(hooks) {
  setupRenderingTest(hooks);

  test('executes callback without changing piped value', async function(assert) {

    this.set('data', ['car', 'car', 'boat', 'boat']);

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
          (d3-select-all ".car")
          (d3-attr "color" "red")
        ))
        (d3-call (pipe
          (d3-select-all ".boat")
          (d3-attr "color" "blue")
        ))
        (d3-append 'i')
        (d3-attr "class" "truck")
      )}}
    `);

    assert.equal(this.$('.car[color=red]').length, 2, "color red was applied to cars");
    assert.equal(this.$('.boat[color=blue]').length, 2, "color blue was applied to boats");
    assert.equal(this.$('g > .truck').length, 1, "truck was added directly to the test-items container");

  });
});