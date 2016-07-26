import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-join', 'Integration | Helper | d3-join', {
  integration: true
});

test('it renders', function(assert) {

  this.set('data', ['red', 'blue', 'yellow', 'green']);

  // Template block usage:
  this.render(hbs`
    <svg></svg>

    {{#if ready}}
      {{shhh (compute (pipe
          (d3-select "svg")
          (d3-select-all "rect")
          (d3-data data)
          (d3-join
            enter=(pipe
              (d3-append "rect")
              (d3-text (r/param))
            )
          )
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.equal(this.$('rect').length, 4, "four rectanges were rendered");
  assert.ok(this.$('rect:contains(red)').length);
  assert.ok(this.$('rect:contains(blue)').length);
  assert.ok(this.$('rect:contains(yellow)').length);
  assert.ok(this.$('rect:contains(green)').length);    
});

test('it updated', function(assert) {

  this.set('data', ['red', 'blue', 'yellow', 'green']);

  // Template block usage:
  this.render(hbs`
    <svg></svg>

    {{#if ready}}
      {{shhh (compute (pipe
          (d3-select "svg")
          (d3-select-all "rect")
          (d3-data data)
          (d3-join
            enter=(pipe
              (d3-append "rect")
              (d3-text (r/param))
            )
            update=(pipe
              (d3-text (r/param))
            )
            exit=(pipe
              (d3-remove)
            )
          )
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.equal(this.$('rect').length, 4, "four rectanges were rendered");
  assert.ok(this.$('rect:contains(red)').length);
  assert.ok(this.$('rect:contains(blue)').length);
  assert.ok(this.$('rect:contains(yellow)').length);
  assert.ok(this.$('rect:contains(green)').length);

  this.set('data', ['pink', 'orange', 'blue']); 

  assert.equal(this.$('rect').length, 3, "three rectanges were rendered after data updated");
  assert.ok(this.$('rect:contains(pink)').length);
  assert.ok(this.$('rect:contains(orange)').length);
  assert.ok(this.$('rect:contains(blue)').length);
});