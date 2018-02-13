var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1 ({
  username: '0e70b60a-f98d-4820-a0c8-a5b121d0eb06',
  password: 'dyEeoVVqQa0d'
});

var params = {
  model: 'en-US_BroadbandModel',
  content_type: 'audio/wav',
  'interim_results': true,
  'max_alternatives': 3,
  'word_confidence': false,
  timestamps: false
};

// Create the stream.
var recognizeStream = speech_to_text.createRecognizeStream(params);

// Pipe in the audio.
fs.createReadStream('./test.wav').pipe(recognizeStream);

// Pipe out the transcription to a file.
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// Get strings instead of buffers from 'data' events.
recognizeStream.setEncoding('utf8');

// Listen for events.
recognizeStream.on('results', function(event) { onEvent('Results:', event); });
recognizeStream.on('data', function(event) { onEvent('Data:', event); });
recognizeStream.on('error', function(event) { onEvent('Error:', event); });
recognizeStream.on('close', function(event) { onEvent('Close:', event); });
recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
};
