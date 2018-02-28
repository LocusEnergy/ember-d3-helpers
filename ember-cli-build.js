'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'ember-bootstrap': {
      'importBootstrapTheme': true
    }
  });

  return app.toTree();
};
