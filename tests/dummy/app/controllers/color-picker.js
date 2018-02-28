import Controller from '@ember/controller';
import { get, computed } from '@ember/object';

export default Controller.extend({
  selectedColor: '',
  colors: 5,
  hues: 5,
  halfHues: computed('hues', function() {
    return Math.round(get(this, 'hues') / 2);
  })
});
