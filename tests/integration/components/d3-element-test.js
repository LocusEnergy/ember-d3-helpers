import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-element', 'Integration | Component | d3 element', {
  integration: true
});

test('uses d3-graph to render elements', function(assert) {
  this.set('data', [ { r: 2 }, { r: 3 }, { r: 5 }]);

  this.on('enter-transition', function(a) {
    console.log('spy')
    console.log(a)
  })
  this.render(hbs`
    {{d3-element
      element-name='circle'
      selector='my_data'
      data=data
      with-transition=false
      enter-transition=(pipe
        (d3-attr 'r' (r/get 'r'))
        (action 'enter-transition') 
      )
    }}
  `);

  let radii = this.$('circle').toArray().map(c => this.$(c).attr('r'))

  console.log(radii)

  assert.equal(this.$('circle').length, 3, 'renders data-joined elements');
});
