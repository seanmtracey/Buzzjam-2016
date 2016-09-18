const SerialPort = require('serialport');
const gpio = require('rpi-gpio');

// const socket = require('socket.io-client')('http://localhost:3000');
const socket = require('socket.io-client')('http://192.168.0.11:3000');
let canSend = false;

socket.on('connect', function(){
  console.log("Connected to server");
  canSend = true;

});


const pins = [7, 11, 12, 13, 15, 16, 18, 22];
const pinStates = [0,0,0,0,0,0,0,0];

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);

    if(value === 1){
      socket.emit('buttonPress', {
        key : pins.indexOf(channel)
      });
    }
    
});

pins.forEach( pin => {
  gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH);
});

