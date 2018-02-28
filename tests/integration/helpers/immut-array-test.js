import { A as emberArray } from '@ember/array';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | immut array', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    let self = this;
    this.owner.register('component:temp-component', Component.extend({
      didReceiveAttrs() {
        self.resultArray = this.getAttr('array');
      }
    }));
  });

  // Replace this with your real tests.
  test('it creates copies of arrays', async function(assert) {
    this.set('array', [1, 2, 3, 4]);
    await render(hbs`{{temp-component array=(immut-array array)}}`);

    assert.deepEqual(this.resultArray, this.get('array'), 'the have the same elements');
    assert.ok(this.resultArray !== this.get('array'), 'but they are not the same array');

    let prev = this.resultArray;
    this.set('array', [1, 2, 3, 4]);

    assert.deepEqual(this.resultArray, this.get('array'), 'the have the same elements');
    assert.ok(this.resultArray !== this.get('array'), 'but they are not the same array');
    assert.ok(prev !== this.resultArray, 'and the previous array instance does not leak');
  });

  test('it creates new copies when the array changes', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4]));
    await render(hbs`{{temp-component array=(immut-array array)}}`);

    let initial = this.resultArray;
    run(() => this.get('array').pushObject(5));
    let current = this.resultArray;

    assert.deepEqual(initial, [1, 2, 3, 4], 'the initial array is untouched');
    assert.deepEqual(current, [1, 2, 3, 4, 5], 'the new array has the added item');
    assert.ok(initial !== current, 'the initial and current are not the same');
    assert.ok(current !== this.get('array'), 'the current and original are unchanged');
  });
});