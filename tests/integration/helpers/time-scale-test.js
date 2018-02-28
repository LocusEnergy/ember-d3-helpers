import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | time scale', function(hooks) {
  setupRenderingTest(hooks);

  test('it generates ticks', async function(assert) {
    let start = new Date(2016, 2, 1);
    let end = new Date(2016, 2, 31);
    this.set('domain', [start, end]);

    await render(hbs`
      {{#with (time-scale domain) as |scale|}}
        {{#each (scale-ticks scale (time-interval 'day')) as |tickValue|}}
          <a>{{tickValue}}</a>
        {{/each}}
      {{/with}}
    `);

    assert.equal(this.$('a').length, 31, 'it generates 31 ticks');
    assert.equal(this.$('a:eq(0)').text().trim(), start.toString());
  });
});