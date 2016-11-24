import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-on', 'Integration | Helper | d3-on', {
  integration: true
});

test('adds a listener to each selected element', function(assert) {
  assert.expect(4);

  const listener = () => {
    assert.ok(true, 'listener called');
  };

  this.set('data', ['car', 'car', 'boat', 'boat']);
  this.set('listener', listener);

  this.render(hbs`
    {{d3-graph (pipe
      (d3-call (pipe
        (d3-select-all "i")
        (d3-data data)
        (d3-join enter=(pipe
          (d3-append "i")
          (d3-attr "class" (r/param))
        ))
      ))
      (d3-call (pipe
        (d3-select-all "i")
        (d3-on "click" listener)
      ))
    )}}
  `);

  this.$('i').each(function() {
    $(this).trigger('click');
  });
});
