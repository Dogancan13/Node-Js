const EventEmitter = require('events');
const chalk = require('chalk');

class TrafficLight extends EventEmitter {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.on('red', () => {
      console.log(chalk.bgRed.white(' RED '));
      setTimeout(() => this.emit('yellow'), 3000);
    });

    this.on('yellow', () => {
      console.log(chalk.bgYellow.black(' YELLOW '));
      setTimeout(() => this.emit('green'), 3000);
    });

    this.on('green', () => {
      console.log(chalk.bgGreen.black(' GREEN '));
      setTimeout(() => this.emit('red'), 3000);
    });
  }

  start() {
    this.emit('red'); // Start the cycle
  }
}

const trafficLight = new TrafficLight();
trafficLight.start();
