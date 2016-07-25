import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-select', 'Integration | Component | d3 select', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`
    <a id="my-link"></a>
    {{#if ready}}
      {{shhh (compute (pipe 
        (d3-select "#my-link")
        (d3-attr "name" "fred")
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.equal(this.$('#my-link').attr('name'), 'fred');
});
