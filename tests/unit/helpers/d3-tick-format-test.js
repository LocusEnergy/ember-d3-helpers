import { d3TickFormat } from 'dummy/helpers/d3-tick-format';
import { module, test } from 'qunit';

module('Unit | Helper | d3 tick format');

// Replace this with your real tests.
test('it works', function(assert) {
  let tickFunction = function(timeFormatter) {
    console.log(timeFormatter);
    return function(d) {
      return timeFormatter('%A')(d);
    };
  };
  let functionResult = d3TickFormat([tickFunction]);
  assert.ok(functionResult);
  let stringResult = d3TickFormat(['%A']);
  assert.ok(stringResult);
});
