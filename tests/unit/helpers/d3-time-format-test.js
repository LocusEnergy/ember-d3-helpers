import { d3TimeFormat } from 'dummy/helpers/d3-time-format';
import { module, test } from 'qunit';

module('Unit | Helper | d3 time format', function() {
  test('it works', function(assert) {
    let formatter = d3TimeFormat([ '%Y' ]);
    
    // this is just a sanity check - lets ensure we don't have to deal with TZ / DST issues in CI 
    assert.equal(formatter(new Date('2011-08-02')), '2011');
  });
});