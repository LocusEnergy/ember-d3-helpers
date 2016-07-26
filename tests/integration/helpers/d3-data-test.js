import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-data', 'Integration | Helper | d3-data', {
  integration: true
});

test('provides data', function(assert) {

  this.set('data', ['red', 'blue', 'yellow']);
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

  assert.equal(this.$('rect').length, 3, "three rect's are rendred");
  assert.equal(this.$().text().trim(), 'redblueyellow', "text is rendered");

});

test('updates when data changes', function(assert) {

  this.set('data', ['red', 'blue', 'yellow']);
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

  assert.equal(this.$('rect').length, 3, "three rect's are rendred");
  assert.equal(this.$().text().trim(), 'redblueyellow', "text is rendered");

  this.set('data', ['red', 'blue']);

  assert.equal(this.$('rect').length, 2, "two rect's are rendred");
  assert.equal(this.$().text().trim(), 'redblue', "text is rendered");

});

test('can provide custom key', function(assert) {

  this.set('data', [
    {name: 'Locke', number: 4},
    {name: 'Reyes', number: 8},
    {name: 'Ford', number: 15},
    {name: 'Jarrah', number: 16},
    {name: 'Shephard', number: 31},
    {name: 'Kwon', number: 34}
  ]);

  this.set('key', function(d) { 
    return d ? d.name : this.id; 
  });

  // Template block usage:
  this.render(hbs`
    <svg></svg>

    {{#if ready}}
      {{shhh (compute (pipe
          (d3-select "svg")
          (d3-select-all "rect")
          (d3-data data key)
          (d3-join 
            enter=(pipe
              (d3-append "rect")
              (d3-text (r/get "number"))
            )
          )
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.equal(this.$('rect').length, 6, "six rect are rendred");
  assert.equal(this.$().text().trim(), '4815163134', "numbers are rendered");

});