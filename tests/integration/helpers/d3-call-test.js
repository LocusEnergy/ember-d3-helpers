import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-call', 'Integration | Helper | d3-call', {
  integration: true
});

test('executes callback without changing piped value', function(assert) {

  this.render(hbs`
    <div class="test-items">
      <i class="car"></i>
      <i class="car"></i>
      <i class="boat"></i>
      <i class="boat"></i>
    </div>

    {{#if ready}}
      {{shhh (compute (pipe 
          (d3-select ".test-items")
          (d3-call (pipe 
            (d3-select-all ".car")
            (d3-attr "color" "red")
          ))
          (d3-call (pipe
            (d3-select-all ".boat")
            (d3-attr "color" "blue")
          ))
          (d3-append 'i')
          (d3-attr "class" "truck")
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.equal(this.$('.car[color=red]').length, 2, "color red was applied to cars");
  assert.equal(this.$('.boat[color=blue]').length, 2, "color blue was applied to boats");
  assert.equal(this.$('.test-items > .truck').length, 1, "truck was added directly to the test-items container");

});
