import { d3Stack } from 'dummy/helpers/d3-stack';
import { module, test } from 'qunit';

module('Unit | Helper | d3 stack', function() {
  test('it works', function(assert) {
    const data = [
      {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
      {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
      {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
      {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
    ];
    let stack = d3Stack([], {
      keys: ["apples", "bananas", "cherries", "dates"],
      value: (d, key) => {
        return d[key] * 2; // Double each value
      },
    });
    const result = stack(data);
    const doubledData = [
      [ [ 0, 7680 ], [ 0, 3200 ], [ 0, 1280 ], [ 0, 640 ] ], // apples
      [ [ 7680, 11520 ], [ 3200, 6080 ], [ 1280, 3200 ], [ 640, 1600 ] ], // bananas
      [ [ 11520, 13440 ], [ 6080, 8000 ], [ 3200, 4480 ], [ 1600, 2880 ] ], // cherries
      [ [ 13440, 14240 ], [ 8000, 8800 ], [ 4480, 5280 ], [ 2880, 3680 ] ], // dates
    ];
    assert.deepEqual(
      result,
      doubledData,
      'each result value should be double the original value'
    );
  });
});