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

test('can get data from data function', function(assert){

  this.set('data', [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ]);

/**
 * Code example taken from https://github.com/d3/d3-selection#selection_data
 ```js
  var tr = d3.select("body")
    .append("table")
    .selectAll("tr")
    .data(matrix)
    .enter().append("tr");

  var td = tr.selectAll("td")
    .data(function(d) { return d; })
    .enter().append("td")
      .text(function(d) { return d; });  
 ```
 */

  this.render(hbs`
    <div id="table-container"></div>

    {{#if ready}}
      {{shhh (compute (pipe
          (d3-select "#table-container")
          (d3-append "table")
          (d3-select-all "tr")
          (d3-data data)
          (d3-call (d3-join
            enter=(pipe
              (d3-append "tr")
              (d3-select-all "td")
              (d3-data (r/param))
              (d3-join
                enter=(pipe
                  (d3-append "td")
                  (d3-text (r/param))
                )
              )
            )
          ))
        ))
      }}
    {{/if}}
  `);

  this.set('ready', true);

  assert.deepEqual(text(this.$('tr:eq(0) td')), [11975,  5871, 8916, 2868]);
  assert.deepEqual(text(this.$('tr:eq(1) td')), [ 1951, 10048, 2060, 6171]);
  assert.deepEqual(text(this.$('tr:eq(2) td')), [ 8010, 16145, 8090, 8045]);    
  assert.deepEqual(text(this.$('tr:eq(3) td')), [ 1013,   990,  940, 6907]);

  function text(row) {
    return row.map(function(){
      return parseInt($(this).text(), 10);
    }).toArray();
  }
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