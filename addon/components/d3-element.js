import Ember from 'ember';
import layout from '../templates/components/d3-element';

export default Ember.Component.extend({
  layout,
  tagName: '',
  'with-transition': true,
  
  // default selector; usually developer overwritten
  selector: '__d3-element'
});
