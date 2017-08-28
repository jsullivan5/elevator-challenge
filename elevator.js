export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.queue = [];
    this.passengers = [];
    this.floorCount = 0;
  }

  goToFloor(person) {
    while (this.currentFloor !== person.currentFloor) {
      this.currentFloor > person.currentFloor ? (this.currentFloor--, this.floorCount++) : (this.currentFloor++, this.floorCount++);
    }

    while (this.currentFloor !== person.dropOffFloor) {
      this.currentFloor > person.dropOffFloor ? (this.currentFloor--, this.floorCount++) :
      (this.currentFloor++, this.floorCount++)
    }
  }

  reset() {
    this.currentFloor = 0;
    this.queue = [];
    this.passengers = [];
    this.floorCount = 0;
  }
}
