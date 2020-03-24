const express = require('express');
const env = require('dotenv')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

if (process.env.NODE_ENV !== 'production') {
  env.load;
}

const app = express();

app.get('/', (req, res) => {
  res.send('sup girl!')
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body == 'hello') {
    twiml.message('Hi!');
  } else if (req.body == 'bye') {
    twiml.message('Goodbye');
  } else {
    twiml.message(
      'No Body param match, Twilio sends this in the request to your server.'
    );
  }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
