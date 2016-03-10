import Ember from 'ember';

let id = 0;

export default Ember.Controller.extend({
  data: [
    { r: 10, x: 10, y: 10, id: ++id },
    { r: 20, x: 30, y: 30, id: ++id },
    { r: 30, x: 65, y: 65, id: ++id }
  ],
  radius: 30,
  x: 120,
  y: 65,
  actions: {
    addCircle(r) {
      let data = this.get('data');
      let x = parseInt(this.get('x'), 10);
      let y = this.get('y');
      ++id;
      data.pushObject({ r, x, y, id });
      this.setProperties({
        x: x + 2 * r,
        radius: r - 5
      });
    },
    removeCircle(item) {
      let data = this.get('data');
      data.removeObject(item);
    }
  }
});