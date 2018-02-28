import { module } from 'qunit';
import { select } from 'd3-selection';
import $ from 'jquery';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      $('<div/>', { class: 'test-node' } ).appendTo('#qunit-fixture');
      const selection = select('.test-node');
      const { constructor } = selection;

      this.d3Selection = selection;
      this.isSelection = (selection) => selection instanceof constructor;

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      $(`.test-node`).remove();

      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }
    }
  });
}
