export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.passengers = [];
    this.floorCount = 0;
    this.stopCount = 0;
    this.requests = 0;
  }

  goToFloor(...args) {
    this.passengers = [ ...arguments ];

    for (var i = 0; i < this.passengers.length; i) {
      this.requests++;

      while (this.currentFloor !== this.passengers[i].currentFloor) {
        this.currentFloor > this.passengers[i].currentFloor ? (this.currentFloor--, this.floorCount++) : (this.currentFloor++, this.floorCount++);
      }

      this.stopCount++;

      while (this.currentFloor !== this.passengers[i].dropOffFloor) {
        this.currentFloor > this.passengers[i].dropOffFloor ? (this.currentFloor--, this.floorCount++) :
        (this.currentFloor++, this.floorCount++);
      }

      this.stopCount++;
      this.passengers.shift()
    }
  }

  reset() {
    this.currentFloor = 0;
    this.passengers = [];
    this.floorCount = 0;
    this.stopCount = 0;
    this.requests = 0;
  }
}
