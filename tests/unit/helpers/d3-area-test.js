import { d3Area } from 'dummy/helpers/d3-area';
import { module, test } from 'qunit';
import { bandScale } from 'dummy/helpers/band-scale';


module('Unit | Helper | d3 area', function() {
  test('it works', function(assert) {
    const scale = bandScale([
      ['hamilton', 'burr', 'washington'],
      [0, 100]
    ], {});

    const options = {
      xAccessor() { return this; },
      yAccessor() { return this; }
    };

    const area = d3Area([scale, scale], options);
    assert.equal(typeof area, 'function', 'returns a function');
  });
});
