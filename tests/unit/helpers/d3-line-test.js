import { d3Line } from 'dummy/helpers/d3-line';
import { module, test } from 'qunit';

module('Unit | Helper | d3 line', function() {
  test('it works', function(assert) {
    let options = {
      xAccessor() { return this; },
      yAccessor() { return this; }
    };

    let line = d3Line([function() { return this; }, function() { return this; }], options);
    assert.equal(typeof line, 'function', 'returns a function');
  });
});
