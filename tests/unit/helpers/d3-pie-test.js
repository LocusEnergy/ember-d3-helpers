import { d3Pie } from 'dummy/helpers/d3-pie';
import { module, test } from 'qunit';

module('Unit | Helper | d3 pie', function() {
  test('it works', function(assert) {
    assert.expect(2);
    let data = [
      {
        key: 'arc 1',
        value: 50
      },{
        key: 'arc 2',
        value: 50
      }, {
        key: 'arc 3',
        value: 50
      }
    ];

    let valueFn = ({ value }) => value;

    let pie = d3Pie([], { valueFn });
    let pieData = pie(data);
    let arcs = pieData.map(({ startAngle, endAngle }) => (endAngle - startAngle).toFixed(6));

    assert.equal(pieData.length, 3, 'The number of calculated arcs is correct');
    assert.deepEqual(arcs, ["2.094395", "2.094395", "2.094395"], 'returning the correct number of radians');

  });
});