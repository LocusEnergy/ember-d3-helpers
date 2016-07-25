import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-transition', 'Integration | Component | d3 transition', {
  integration: true
});

import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const {
  run: { later }
} = Ember;

test('is applied to selection', function(assert) {
  assert.expect(1);

  // Template block usage:
  this.render(hbs`
    <a id="my-link"></a>
    {{#if ready}}
      {{shhh (compute (pipe 
        (d3-select "#my-link")
        (d3-transition)
        (d3-style "color" "red")
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  // wait for transition
  later(()=> {}, 250);

  return wait().then(function(){
    assert.equal(this.$('#my-link').attr('style'), 'color: rgb(255, 0, 0);');
  });
});