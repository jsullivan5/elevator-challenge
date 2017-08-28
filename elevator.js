export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.queue = [];
    this.passengers = [];
    this.floorCount = 0;
    this.stopCount = 0;
    this.requests = 0;
  }

  goToFloor(...args) {
    this.passengers = [ ...arguments ]

    this.passengers.forEach(person => {
      this.requests++;

      while (this.currentFloor !== person.currentFloor) {
        this.currentFloor > person.currentFloor ? (this.currentFloor--, this.floorCount++) : (this.currentFloor++, this.floorCount++);
      }

      this.stopCount++;

      while (this.currentFloor !== person.dropOffFloor) {
        this.currentFloor > person.dropOffFloor ? (this.currentFloor--, this.floorCount++) :
        (this.currentFloor++, this.floorCount++);
      }

      this.stopCount++;
      this.queue.shift();
    });
  }

  reset() {
    this.currentFloor = 0;
    this.queue = [];
    this.passengers = [];
    this.floorCount = 0;
    this.stopCount = 0;
    this.requests = 0;
  }
}
