import { bandScale } from 'dummy/helpers/band-scale';
import { module, test } from 'qunit';

module('Unit | Helper | band scale', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let result;

    result = bandScale([
      ['hamilton', 'burr', 'washington'],
      [0, 100]
    ], {});
    assert.deepEqual(result.domain(), ['hamilton', 'burr', 'washington'], 'domain is established');
    assert.equal(result.range()[0], 0, 'the range is also set');

    result = bandScale([
      ['hamilton', 'burr'],
      [0, 50]
    ], {
      padding: 0.5
    });
    assert.equal(result('hamilton'), 10, 'padding works');

    let things = [{}, {}, {}, {}];
    result = bandScale([
      things,
      [0, 100]
    ], {});
    assert.equal(result(things[0]), 0);
    assert.equal(result(things[1]), 25);
  });
});