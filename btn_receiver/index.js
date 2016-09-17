var SerialPort = require('serialport');
 var port = new SerialPort("/dev/tty.usbmodem1451", {
  parser: SerialPort.parsers.readline('\n'),
  baudrate : 57600
});

const socket = require('socket.io-client')('http://localhost:3000');
let canSend = false;

socket.on('connect', function(){
  console.log("Connected to server");
  canSend = true;
  // socket.emit("buttons",{data : "0000000"} );
});

port.on('data', data => {


  if(canSend){
    socket.emit("buttons", {buttons : data} );
  }
  // console.log(data);

});

