import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | d3 graph', function(hooks) {
  setupRenderingTest(hooks);


  test('it allows to render multiple nested graphs', async function(assert) {
    await render(hbs`
      {{#d3-graph as |d3|}}
        {{d3.graph (pipe (d3-append "rect") (d3-attr "name" "foo"))}}
        {{d3.graph (pipe (d3-append "rect") (d3-attr "name" "bar"))}}
      {{/d3-graph}}
    `);

    assert.ok(this.$('g').length, 1, "only one g is rendered");
    assert.ok(this.$('rect[name=foo]').length, 1, "rect name foo is rendered");
    assert.ok(this.$('rect[name=bar]').length, 1, "rect name bar is rendered");
  });

  test('passing graph pipe yields piped selection', async function(assert) {

    await render(hbs`
      {{#d3-graph (pipe
        (d3-append "rect")
        (d3-attr "class" "piped")
      ) as |d3|}}
        {{d3.graph (pipe
          (d3-append "rect")
          (d3-attr "class" "deeply-nested")
        )}}
      {{/d3-graph}}
    `);

    assert.ok(this.$('rect.piped').length, "rect with class piped is rendered");
    assert.ok(this.$('rect.piped > rect.deeply-nested').length, "rect.deeply-nested in piped");

  });
});