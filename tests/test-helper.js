import Application from '../app';
import QUnit from 'qunit';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();

// Add a custom "approximate" assertion
QUnit.assert.approximate = function (number, expected, message, error = 0.000001) {
  let result = number === expected || Math.abs(number - expected) < error || false;
  this.pushResult({ result, actual: number, expected, message });
};
