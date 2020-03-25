require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  console.log('message received...')
  const incoming = req.body.Body
  const twiml = new MessagingResponse();
  const message = twiml.message();

  if (incoming.includes('art')) {
    message.body('You\'re getting some art!')
  } else {
    message.body('no way! I only send art');
    message.media('https://media.giphy.com/media/l0MYSSCIrv8aUaBsQ/giphy.gif');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
