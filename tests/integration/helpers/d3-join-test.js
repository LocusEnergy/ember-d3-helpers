import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | d3-join', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.set('data', ['red', 'blue', 'yellow', 'green']);

    // Template block usage:
    await render(hbs`
      {{d3-graph (pipe
        (d3-select-all "rect")
        (d3-data data)
        (d3-join
          enter=(pipe
            (d3-append "rect")
            (d3-text (r/param))
          )
        )
      )}}
    `);

    assert.equal(this.$('rect').length, 4, "four rectanges were rendered");
    assert.ok(this.$('rect:contains(red)').length);
    assert.ok(this.$('rect:contains(blue)').length);
    assert.ok(this.$('rect:contains(yellow)').length);
    assert.ok(this.$('rect:contains(green)').length);    
  });

  test('it updated', async function(assert) {

    this.set('data', ['red', 'blue', 'yellow', 'green']);

    // Template block usage:
    await render(hbs`
      {{d3-graph (pipe
        (d3-select-all "rect")
        (d3-data data)
        (d3-join
          enter=(pipe
            (d3-append "rect")
            (d3-text (r/param))
          )
          update=(pipe
            (d3-text (r/param))
          )
          exit=(pipe
            (d3-remove)
          )
        )
      )}}
    `);

    this.set('ready', true);

    assert.equal(this.$('rect').length, 4, "four rectanges were rendered");
    assert.ok(this.$('rect:contains(red)').length);
    assert.ok(this.$('rect:contains(blue)').length);
    assert.ok(this.$('rect:contains(yellow)').length);
    assert.ok(this.$('rect:contains(green)').length);

    this.set('data', ['pink', 'orange', 'blue']); 

    assert.equal(this.$('rect').length, 3, "three rectanges were rendered after data updated");
    assert.ok(this.$('rect:contains(pink)').length);
    assert.ok(this.$('rect:contains(orange)').length);
    assert.ok(this.$('rect:contains(blue)').length);
  });
});