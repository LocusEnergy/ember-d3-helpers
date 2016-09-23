import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-element', 'Integration | Component | d3 element', {
  integration: true
});

test('uses d3-graph to render elements', function(assert) {
  this.set('data', [ { r: 2 }, { r: 3 }, { r: 5 }]);
  this.on('halver', ({ r }) => r / 2);

  this.render(hbs`
    {{d3-element
      element-name='circle'
      data=data
      with-transition=false
      enter-transition=(pipe
        (d3-attr 'r' (r/get 'r'))
        (d3-attr 'opacity' (action 'halver'))
      )
    }}
  `);

  let circles = this.$('circle').toArray();
  let radii = circles.map(c => this.$(c).attr('r'));
  let opacities = circles.map(c => this.$(c).attr('opacity'));

  assert.equal(circles.length, 3, 'renders data-joined elements');
  assert.deepEqual(radii, ['2', '3', '5'], 'transition events are customizable');
  assert.deepEqual(opacities, ['1', '1.5', '2.5'], 'transition events are chainable');
});

test('transition event pipes', function(assert) {
  let steps = [];
  this.set('data', []);
  
  this.on('record-step', (s, selection) => {
    steps.push(s);
    return selection;
  });

  this.render(hbs`
    {{d3-element
      element-name='circle'
      data=data
      with-transition=false
      enter-transition=(action 'record-step' 'enter-transition') 
      on-enter=(action 'record-step' 'on-enter')
      update-transition=(action 'record-step' 'update-transition')
      on-update=(action 'record-step' 'on-update')
      exit-transition=(action 'record-step' 'exit-transition')
      on-exit=(action 'record-step' 'on-exit')
    }}
  `);

  assert.deepEqual(steps, ['enter-transition', 'on-enter', 'update-transition', 'on-update', 'exit-transition', 'on-exit'], 'each transition pipe is called in order');
});
