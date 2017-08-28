require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();
  const time = new Date().getHours()

  beforeEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };

    elevator.goToFloor(mockUser);

    assert.equal(elevator.stopCount, 2);

    if (time >= 12) {
      assert.equal(elevator.currentFloor, 5);
      assert.equal(elevator.floorCount, 5);
    } else {
      assert.equal(elevator.floorCount, 10);
      assert.equal(elevator.currentFloor, 0);
    }

    assert.equal(elevator.stopCount, 2);
    assert.equal(elevator.passengers.length, 0);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };

    elevator.goToFloor(mockUser);

    if (time >= 12) {
      assert.equal(elevator.currentFloor, 3);
      assert.equal(elevator.floorCount, 13);
    } else {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.floorCount, 16);
    }

    assert.equal(elevator.stopCount, 2);
    assert.equal(elevator.passengers.length, 0);

  });

  it('should reset the elevator when reset is called', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };

    elevator.goToFloor(mockUser);

    if (time >= 12) {
      assert.equal(elevator.currentFloor, 3);
      assert.equal(elevator.floorCount, 16);
    } else {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.floorCount, 19);
    }

    elevator.reset()

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.floorCount, 0);
  });

  it('should allow passengers A and B to go up', () => {
    let mockUser1 = { name: "Brittany", currentFloor: 2, dropOffFloor: 4 };
    let mockUser2 = { name: "Rockin' Robbie", currentFloor: 1, dropOffFloor: 7 };

    elevator.goToFloor(mockUser1, mockUser2)

    if (time >= 12) {
      assert.equal(elevator.currentFloor, 7);
      assert.equal(elevator.floorCount, 13);
    } else {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.floorCount, 20);
    }

    assert.equal(elevator.requests, 2);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.passengers.length, 0);
  });

  it('should allow passengers A to go up and B to go down', () => {
    let mockUser1 = { name: "Brittany", currentFloor: 2, dropOffFloor: 4 };
    let mockUser2 = { name: "Rockin' Robbie", currentFloor: 7, dropOffFloor: 1 };

    elevator.goToFloor(mockUser1, mockUser2)

    if (time >= 12) {
      assert.equal(elevator.currentFloor, 1);
      assert.equal(elevator.floorCount, 13);
    } else {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.floorCount, 14);
    }

    assert.equal(elevator.requests, 2);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.passengers.length, 0);
  });

  it('should allow passengers A to go down and B to go up', () => {
    let mockUser1 = { name: "Brittany", currentFloor: 4, dropOffFloor: 2 };
    let mockUser2 = { name: "Rockin' Robbie", currentFloor: 1, dropOffFloor: 7 };

    elevator.goToFloor(mockUser1, mockUser2)

    if (time >= 12) {
      assert.equal(elevator.currentFloor, 7);
      assert.equal(elevator.floorCount, 13);
    } else {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.floorCount, 20);
    }

    assert.equal(elevator.requests, 2);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.passengers.length, 0);
  });

  it('should allow passengers A and B to go down', () => {
    let mockUser1 = { name: "Brittany", currentFloor: 4, dropOffFloor: 2 };
    let mockUser2 = { name: "Rockin' Robbie", currentFloor: 7, dropOffFloor: 1 };

    elevator.goToFloor(mockUser1, mockUser2)

    if (time >= 12) {
      assert.equal(elevator.currentFloor, 1);
      assert.equal(elevator.floorCount, 17);
    } else {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.floorCount, 18);
    }

    assert.equal(elevator.requests, 2);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.passengers.length, 0);
  });
});
