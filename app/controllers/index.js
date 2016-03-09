import Ember from 'ember';

export default Ember.Controller.extend({
  data: [
    { r: 10, x: 10, y: 10 },
    { r: 20, x: 30, y: 30 },
    { r: 30, x: 65, y: 65 }
  ],
  radius: 30,
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
      data.pushObject({
        r, 
        x: 100, 
        y: 100 
      });
    },
    removeCircle(item) {
      let data = this.get('data');
      data.removeObject(item);
    }
  }
});