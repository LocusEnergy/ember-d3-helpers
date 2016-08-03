import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-select-all', 'Integration | Helper | d3-select-all', {
  integration: true
});

test('selects multiple elements', function(assert) {

  this.set('data', ['a', 'a b', 'b c']);

  // Template block usage:
  this.render(hbs`
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

test('selection changes when selector is changed', function(assert){

  this.set('data', ['a', 'a', 'b', 'b']);

  this.set('selector', '.a');

  // Template block usage:
  this.render(hbs`
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
