import { d3Arc } from 'dummy/helpers/d3-arc';
import { module, test } from 'qunit';

module('Unit | Helper | d3 arc');

test('it works', function(assert) {
  let arc = d3Arc([ 42, 42 ]);
  
  assert.equal(typeof arc, 'function', 'returns a function');
});
