//const socket = require('socket.io-client')('http://localhost:3000');
require('dotenv').config();
const fetch = require('node-fetch');

fetch('https://smt-buzzjam-2017.herokuapp.com/get-socket')
  .then(res => {
    if(res.ok){
      return res.text();
    } else {
      throw res;
    }
  })
  .then(url => {
    
    const socket = require('socket.io-client')(url || process.env.SOCKET_SERVER);
    let canSend = false;
    
    socket.on('connect', function(){
      console.log("Connected to server");
      canSend = true;
    });
    
    const pins = [7, 11, 12, 13, 15, 16, 18, 22];
    const gpio = require('rpi-gpio');
    const pinStates = [0,0,0,0,0,0,0,0];
    
    gpio.on('change', function(channel, value) {
        console.log('Channel ' + channel + ' value is now ' + value);
    
        if(value === true){
          socket.emit('buttonPress', {
            key : pins.indexOf(channel)
          });
        }
    
    });
    
    pins.forEach( pin => {
      gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH);
    });

  })
  .catch(err => {
    console.log('Fetch error:', err);
  })
;
