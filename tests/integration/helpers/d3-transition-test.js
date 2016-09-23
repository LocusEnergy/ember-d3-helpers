import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-transition', 'Integration | Helper | d3-transition', {
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
    {{d3-graph (pipe 
      (d3-transition)
      (d3-style "color" "red")
    )}}
  `);

  // wait for transition
  later(()=> {}, 250);

  return wait().then(() => {
    assert.equal(this.$('g').attr('style'), 'color: rgb(255, 0, 0);');
  });
});