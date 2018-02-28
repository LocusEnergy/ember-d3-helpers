import { d3Append } from 'dummy/helpers/d3-append';
import { test } from 'qunit';
import d3UnitModule from '../../helpers/d3-unit-helper';
import $ from 'jquery';

d3UnitModule('Unit | Helper | d3 append');

test('it returns a function', function(assert) {
  assert.equal(typeof d3Append(['rect']), 'function');
});

test('append helper', function(assert) {
  let { d3Selection, isSelection } = this;

  assert.ok(d3Selection.append, 'has append method');

  let circle = d3Append(['circle'])(d3Selection);

  assert.equal(circle._groups.length, 1, 'groups property has array of length 1');
  assert.deepEqual(circle._groups[0][0], $('circle')[0]);
  assert.ok(isSelection(circle), 'append returns a selection');
});
