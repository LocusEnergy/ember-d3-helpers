import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | scale ticks', function(hooks) {
  setupRenderingTest(hooks);

  test('it generates ticks', async function(assert) {
    this.set('domain', [0, 10]);
    this.set('range', [0, 100]);

    await render(hbs`
      {{#with (linear-scale domain range) as |scale|}}
        {{#each (scale-ticks scale 11) as |tickValue|}}
          <a>{{scale-value scale tickValue}}</a>
        {{/each}}
      {{/with}}
    `);

    assert.equal(this.$('a').length, 11, 'it generates 11 ticks');
  });
});