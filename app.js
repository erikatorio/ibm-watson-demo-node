const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3'); //language translator package
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1'); //speech to text package

const LineIn = require ('line-in'); //package that reads audio data 

const langTranslator = new LanguageTranslatorV3({
    iam_apikey: '7pGkCbYsyKWzMFz9uIIp7Jj6p7uoanxqIAsbnSVW6aGW',
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    version: '2018-08-07',
});

const speechToText = new SpeechToTextV1({
    username: '5229a9a2-de21-4fe7-877b-66203f56b13d',
    password: 'Q3IBcKsEvH3D',
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
});

const lineIn = new LineIn();

const recognizeStream = speechToText.recognizeUsingWebSocket({
    content_type: 'audio/l16; rate=44100; channels=2', //type of audio
    interim_results: true //allows receiving transcribed text in real time
}); //custom two way stream

//lineIn.pipe(recognizeStream).pipe(process.stdout);

const textStream = lineIn.pipe(recognizeStream); //text returned
textStream.setEncoding('utf8'); //will return buffers instead of strings

textStream.on('data', data => { //callback function that will receive text from the speech-to-text service
    const params = { //parameters object
        text: data, //data passed into the callback function
        model_id: 'en-es' //english to spanish
    };

    langTranslator.translate(params, (err, res) => {
        console.log(res.translations[0].translation);
    }) //translates given the parameters and displays output
});