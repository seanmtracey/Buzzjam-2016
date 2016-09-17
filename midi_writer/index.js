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

let previousStates = [0,0,0,0,0,0,0,0,0,0,0];

io.on('connection', function(socket){
	console.log("Client connected");
	socket.on('buttons', function(data){

		const bStates = data.buttons.split('');
		bStates.pop();

		for(var x = 0; x < bStates.length; x += 1){

			if(bStates[x] !== previousStates[x]){
				if(bStates[x] === "1"){
					console.log(bStates[x]);
					midiOutput.sendMessage([DOWN_CODE, notes[x], 127]);

					setTimeout(function(){
						midiOutput.sendMessage([UP_CODE, notes[x], 0]);
					}, 500);

				}
			}

		}

		previousStates = bStates;

	});
});
server.listen(3000);