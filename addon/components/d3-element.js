import Component from '@ember/component';
import layout from '../templates/components/d3-element';

export default Component.extend({
  layout,
  tagName: '',
  'with-transition': true,
  
  // default selector; usually developer overwritten
  selector: '__d3-element'
});
