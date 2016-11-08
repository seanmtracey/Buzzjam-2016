var midi = require('midi');

const duration = 1000;

// Set up a new input.
var input = new midi.input();
const midiOutput = new midi.output();

const notes = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72];

const DOWN_CODE = 144;
const UP_CODE = 128;

midiOutput.openVirtualPort("ArmBand 1");

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log("Client connected");
	socket.on('buttonPress', function(data){

		const idx = data.key; 

		midiOutput.sendMessage([DOWN_CODE, notes[idx], 127]);

		setTimeout(function(){
			midiOutput.sendMessage([UP_CODE, notes[idx], 0]);
		}, 1000);

	});
});

const t = 500;

setInterval(function(){

	const idx = Math.random() * notes.length | 0;

	midiOutput.sendMessage([DOWN_CODE, notes[idx], 127]);

	setTimeout(function(){
		midiOutput.sendMessage([UP_CODE, notes[idx], 0]);
	}, t);

}, t);

server.listen(3000);