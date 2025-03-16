const EventEmitter = require("events");

// Custom Counter class that extends EventEmitter
class Counter extends EventEmitter {
  constructor() {
    super();
    this.counter = 0; // Initialize counter to 0
  }

  // Method to increase the counter
  increase() {
    this.counter += 1;
    this.emitChange("increase");
  }

  // Method to decrease the counter
  decrease() {
    this.counter -= 1;
    this.emitChange("decrease");
  }

  // Helper method to emit events based on counter changes
  emitChange(type) {
    this.emit(type, this.counter); // Emit the event type and current counter value

    // Emit 'zero', 'positive', or 'negative' events based on the counter value
    if (this.counter === 0) {
      this.emit("zero", this.counter);
    } else if (this.counter > 0) {
      this.emit("positive", this.counter);
    } else {
      this.emit("negative", this.counter);
    }
  }
}

// Create an instance of the Counter class
const counter = new Counter();

// Event listener for any change in the counter
counter.on("change", (count) => {
  console.log(`Counter changed. Current value: ${count}`);
});

// Event listener for 'increase' event
counter.on("increase", (count) => {
  console.log(`Counter increased. Current value: ${count}`);
});

// Event listener for 'decrease' event
counter.on("decrease", (count) => {
  console.log(`Counter decreased. Current value: ${count}`);
});

// Event listener for 'zero' event
counter.on("zero", (count) => {
  console.log(`Counter is now zero. Current value: ${count}`);
});

// Event listener for 'positive' event
counter.on("positive", (count) => {
  console.log(`Counter is now positive. Current value: ${count}`);
});

// Event listener for 'negative' event
counter.on("negative", (count) => {
  console.log(`Counter is now negative. Current value: ${count}`);
});

// Test the counter with different scenarios
try {
  console.log("Starting counter at 0");
  counter.increase(); // Increase to 1
  counter.increase(); // Increase to 2
  counter.decrease(); // Decrease to 1
  counter.decrease(); // Decrease to 0
  counter.decrease(); // Decrease to -1
  counter.decrease(); // Decrease to -2
  counter.increase(); // Increase to -1
  counter.increase(); // Increase to 0
  counter.increase(); // Increase to 1
} catch (error) {
  console.error("An error occurred:", error);
}
