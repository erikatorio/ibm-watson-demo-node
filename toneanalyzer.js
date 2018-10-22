var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  username: 'b1074918-6aca-43c7-a624-00a4f9e35602',
  password: 'm8mqLW2A6Svb',
  version: '2016-05-19',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

toneAnalyzer.tone(
  {
    tone_input: 'I want to kill myself',
    content_type: 'text/plain'
  },
  function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(tone, null, 2));
    }
  }
);