var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1 ({
  username: '0e70b60a-f98d-4820-a0c8-a5b121d0eb06',
  password: 'dyEeoVVqQa0d'
});

// Create the stream.
var files = ['./Tamika.mp3'];
// var files = ['./test.wav'];
for (var file in files) {
  var params = {
    audio: fs.createReadStream(files[file]),
    content_type: 'audio/mp3',
    // content_type: 'audio/wav',
    timestamps: true,
    word_alternatives_threshold: 0.9,
    speaker_labels: true,
    resultsBySpeaker: true,
  };

var res = [];
  speech_to_text.recognize(params, function(error, transcript) {
    if (error)
      console.log('Error:', error);
    else
      transcript.results.forEach( result => {
        console.log(result);
        fs.appendFile('./transcription.txt', `${result.alternatives[0].transcript}\n`, function (err) {
          if (err) throw err;
          // console.log('Updated!');
        });
        // console.log(result.alternatives[0]);
      });
  });
}
