import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-select', 'Integration | Helper | d3-select', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`
    {{d3-graph (pipe 
      (d3-call (pipe
        (d3-append "a")
        (d3-attr "id" "my-link")
      ))
      (d3-select "#my-link")
      (d3-attr "name" "fred")
    )}}
  `);

  assert.equal(this.$('#my-link').attr('name'), 'fred');
});
