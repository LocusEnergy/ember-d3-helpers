import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-graph', 'Integration | Component | d3 graph', {
  integration: true
});

test('it allows to render multiple nested graphs', function(assert) {
  this.render(hbs`
    {{#d3-graph as |selection|}}
      {{d3-graph selection (pipe (d3-append "rect") (d3-attr "name" "foo"))}}
      {{d3-graph selection (pipe (d3-append "rect") (d3-attr "name" "bar"))}}      
    {{/d3-graph}}
  `);

  assert.ok(this.$('g').length, 1, "only one g is rendered");
  assert.ok(this.$('rect[name=foo]').length, 1, "rect name foo is rendered");
  assert.ok(this.$('rect[name=bar]').length, 1, "rect name bar is rendered");  
});
