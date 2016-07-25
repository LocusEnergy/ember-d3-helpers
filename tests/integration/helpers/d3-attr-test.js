import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-attr', 'Integration | Helper | d3-attr', {
  integration: true
});

test('applies attribute to selection', function(assert) {
  // Template block usage:
  this.render(hbs`
    <span class="test-element"></span>
    {{#if ready}}
      {{shhh (compute (pipe
          (d3-select ".test-element")
          (d3-attr "name" "applied")
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.equal(this.$('.test-element').attr('name'), 'applied');
});

test('updates element when bound property changes', function(assert){

  this.set('name', 'initial value');

  // Template block usage:
  this.render(hbs`
    <span class="test-element"></span>
    {{#if ready}}
      {{shhh (compute (pipe
          (d3-select ".test-element")
          (d3-attr "name" name)
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.equal(this.$('.test-element').attr('name'), 'initial value');

  this.set('name', 'updated value');

  assert.equal(this.$('.test-element').attr('name'), 'updated value');
});
