export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.queue = [];
    this.passengers = [];
    this.floorCount = 0;
    this.stopCount = 0;
  }

  goToFloor(...args) {
    const personArray = [ ...arguments ];

    personArray.forEach(person => {
      this.queue.push(person);

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
  }
}
