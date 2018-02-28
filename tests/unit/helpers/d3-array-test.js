import { d3Array } from 'dummy/helpers/d3-array';
import { module, test } from 'qunit';

module('Unit | Helper | d3 array', function() {
  test('can use min method', function(assert) {
    let result = d3Array(['min', [10, 20]], {});
    assert.equal(result, 10, 'works as expected');
  });

  test('can use max method', function(assert) {
    assert.equal(d3Array(['max', [10, 15, 20]]), 20, 'works as expected');
    assert.equal(d3Array(['max', [10]]), 10, 'can accept a single data argument');

    let data = [
      {
        a: 20
      },
      {
        a: 67
      }
    ];

    let accessorFn = ({ a }) => a;

    assert.equal(d3Array(['max', data, accessorFn ]), 67, 'can pass optional accessor function as final argument');
  });

  test('can use extent method', function(assert) {
    assert.deepEqual(d3Array(['extent', [2, 15, 20]]), [2, 20], 'works as expected');
  });

  test('can use merge method', function(assert) {
    assert.deepEqual(d3Array(['merge', [['a', 'b'], ['c']]]), ['a', 'b', 'c']);
  });

  test('can use permute method', function(assert) {
    let object = {
      yield: 27,
      variety: 'Manchuria',
      year: 1931,
      site: 'University Farm'
    };
    let fields = ['site', 'variety', 'yield'];

    assert.deepEqual(d3Array(['permute', object, fields]), ['University Farm', 'Manchuria', 27], 'works as expected');
  });

  test('throws an error if using unsupported method', function(assert) {
    assert.throws(() => d3Array(['bisect']), 'this method is not yet supported');
  });
});