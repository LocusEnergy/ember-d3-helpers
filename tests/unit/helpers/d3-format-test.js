import { d3Format } from 'dummy/helpers/d3-format';
import { module, test } from 'qunit';

module('Unit | Helper | d3 format', function() {
  test('it works', function(assert) {
    let formatter = d3Format(['.2s']);
    assert.equal(formatter(4312), '4.3k');
  });
});