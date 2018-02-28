import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
/* FIXME: Leftovers ?
import QUnit from 'qunit';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

// Add a custom "approximate" assertion
QUnit.assert.approximate = function (number, expected, message, error = 0.000001) {
  let result = number === expected || Math.abs(number - expected) < error || false;
  this.push(result, number, expected, message);
};
*/
