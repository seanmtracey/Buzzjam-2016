var midi = require('midi');

const duration = 100;

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

setTimeout(function(){

	notes.forEach( (note, idx) => {

		setTimeout(function(){
			console.log(`PRESSING ${note} (DOWN)`);
			midiOutput.sendMessage([DOWN_CODE, note, 127]);

			setTimeout(function(){
				console.log(`RELEASING ${note} (UP)`);
				midiOutput.sendMessage([UP_CODE, note, 0]);
			}, duration);

		}, duration * (idx + 1));

	});

}, 2000);
