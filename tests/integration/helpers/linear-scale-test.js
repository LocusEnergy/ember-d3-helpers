import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | linear scale', function(hooks) {
  setupRenderingTest(hooks);

  test('it creates scales properly', async function(assert) {
    this.set('domain', [0, 10]);
    this.set('range', [0, 100]);

    await render(hbs`
      {{#with (linear-scale domain range) as |scale|}}
        <a>{{scale-value scale 0}}</a>
        <a>{{scale-value scale 5}}</a>
        <a>{{scale-value scale 10}}</a>
        <a>{{scale-value scale -5}}</a>
        <a>{{scale-value scale 15}}</a>
      {{/with}}
    `);

    assert.equal(this.$('a:eq(0)').text().trim(), '0');
    assert.equal(this.$('a:eq(1)').text().trim(), '50');
    assert.equal(this.$('a:eq(2)').text().trim(), '100');
    assert.equal(this.$('a:eq(3)').text().trim(), '-50');
    assert.equal(this.$('a:eq(4)').text().trim(), '150');

    this.set('range', [100, 300]);

    assert.equal(this.$('a:eq(0)').text().trim(), '100');
    assert.equal(this.$('a:eq(1)').text().trim(), '200');
    assert.equal(this.$('a:eq(2)').text().trim(), '300');
    assert.equal(this.$('a:eq(3)').text().trim(), '0');
    assert.equal(this.$('a:eq(4)').text().trim(), '400');
  });

  test('it takes additional properties', async function(assert) {
    this.set('domain', [0, 10]);
    this.set('range', [0, 100]);

    await render(hbs`
      {{#with (linear-scale domain range clamp=true) as |scale|}}
        <a>{{scale-value scale 0}}</a>
        <a>{{scale-value scale 5}}</a>
        <a>{{scale-value scale 10}}</a>
        <a>{{scale-value scale -5}}</a>
        <a>{{scale-value scale 15}}</a>
      {{/with}}
    `);

    assert.equal(this.$('a:eq(0)').text().trim(), '0');
    assert.equal(this.$('a:eq(1)').text().trim(), '50');
    assert.equal(this.$('a:eq(2)').text().trim(), '100');
    assert.equal(this.$('a:eq(3)').text().trim(), '0');
    assert.equal(this.$('a:eq(4)').text().trim(), '100');
  });
});