var SerialPort = require('serialport');
 
var port = new SerialPort("/dev/tty.usbmodem1451", {
  parser: SerialPort.parsers.readline('\n'),
  baudrate : 57600
});

port.on('data', console.log);