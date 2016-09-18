var midi = require('midi');

const duration = 1000;

// Set up a new input.
var input = new midi.input();
const midiOutput = new midi.output();

const notes = [
	36,
	38,
	40,
	41,
	43,
	45,
	47,
	48,
	50
];

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

server.listen(3000);