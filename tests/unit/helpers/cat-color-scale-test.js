import { catColorScale } from 'dummy/helpers/cat-color-scale';
import { module, test } from 'qunit';

module('Unit | Helper | cat color scale');

test('it functions as a scale helper', function (assert) {
  assert.throws(() => {
    catColorScale([42], {});
  }, 'throws on an incorrect scale name');

  let result;
  result = catColorScale(['10'], {});
  assert.equal(result(10), '#1f77b4');
  result = catColorScale(['10', [10, 20]], {});
  assert.equal(result(11), '#2ca02c');
  assert.notEqual(result(10), result(11));
});

test('scheme 10', function (assert) {
  let result = catColorScale(['10'], {});
  assert.equal(result(0), '#1f77b4');
});

test('scheme 20', function (assert) {
  let result = catColorScale(['20'], {});
  assert.equal(result(0), '#1f77b4');
});

test('scheme 20b', function (assert) {
  let result = catColorScale(['20b'], {});
  assert.equal(result(0), '#393b79');
});

test('scheme 20c', function (assert) {
  let result = catColorScale(['20c'], {});
  assert.equal(result(0), '#3182bd');
});
