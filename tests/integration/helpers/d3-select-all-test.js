import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | d3-select-all', function(hooks) {
  setupRenderingTest(hooks);

  test('selects multiple elements', async function(assert) {

    this.set('data', ['a', 'a b', 'b c']);

    // Template block usage:
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
        (d3-select-all "i.a")
        (d3-text "matched")
      )}}      
    `);

    assert.ok(this.$('i.a:contains(matched)').length);
    assert.ok(this.$('i.a.b:contains(matched)').length);  
    assert.notOk(this.$('i.b.c:contains(matched)').length);
  });

  test('selection changes when selector is changed', async function(assert) {

    this.set('data', ['a', 'a', 'b', 'b']);

    this.set('selector', '.a');

    // Template block usage:
    await render(hbs`
      {{#d3-graph (pipe
          (d3-select-all "i")
          (d3-data data)
          (d3-join enter=(pipe
            (d3-append "i")
            (d3-attr "class" (r/param))
          ))
        ) as |d3|}}
        {{d3.graph (pipe
          (d3-select selector)
          (d3-text "matched")
        )}}
      {{/d3-graph}}
    `);

    assert.ok(this.$('.a:contains(matched)').length);
    assert.ok(this.$('.a:contains(matched)').length);  
    assert.notOk(this.$('.b:contains(matched)').length);
    assert.notOk(this.$('.b:contains(matched)').length);

    this.set('selector', '.b');

    assert.ok(this.$('.a:contains(matched)').length);
    assert.ok(this.$('.a:contains(matched)').length);
    assert.ok(this.$('.b:contains(matched)').length);
    assert.ok(this.$('.b:contains(matched)').length);  
  });
});