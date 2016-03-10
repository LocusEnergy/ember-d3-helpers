import Ember from 'ember';

export default Ember.Controller.extend({
  data: [
    { r: 10, x: 10, y: 10 },
    { r: 20, x: 30, y: 30 },
    { r: 30, x: 65, y: 65 }
  ],
  radius: 30,
  x: 120,
  y: 65,
  getCircleRadius({r}) {
    return r;
  },
  getXCoord({x}) {
    return x;
  },
  getYCoord({y}) {
    return y;
  },
  actions: {
    addCircle(r) {
      let data = this.get('data');
      let x = parseInt(this.get('x'), 10);
      let y = this.get('y');
      data.pushObject({ r, x, y});
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