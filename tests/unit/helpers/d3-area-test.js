import Ember from 'ember';
import { d3Area } from 'dummy/helpers/d3-area';
import { module, test } from 'qunit';
import { bandScale } from 'dummy/helpers/band-scale';


module('Unit | Helper | d3 area', function() {
  const { K } = Ember;

  test('it works', function(assert) {
    let scale = bandScale([
      ['hamilton', 'burr', 'washington'],
      [0, 100]
    ], {});

    let options = {
      xAccessor: K,
      yAccessor: K
    };

    let area = d3Area([scale, scale], options);
    assert.equal(typeof area, 'function', 'returns a function');
  });
});