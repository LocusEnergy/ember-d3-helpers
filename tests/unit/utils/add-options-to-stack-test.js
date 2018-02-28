import addOptionsToStack from 'dummy/utils/add-options-to-stack';
import { module, test } from 'qunit';

module('Unit | Utility | add options to stack', function() {
  test('it works', function(assert) {
    assert.expect(4);

    const keys = ["apples", "bananas", "cherries", "dates"];
    const value = (d, key) => {
      return d[key] * 2; // Double each value
    };
    const order = (a) => {
      return a.reverse();
    };
    const offset = (a) => {
      return a;
    };

    const opts = { keys, value, order, offset, };
    const stack = {
      keys: (opt) => {
        assert.equal(opt, keys);
      },
      value: (opt) => {
        assert.equal(opt, value);
      },
      order: (opt) => {
        assert.equal(opt, order);
      },
      offset: (opt) => {
        assert.equal(opt, offset);
      },
    };

    addOptionsToStack(stack, opts);
  });
});