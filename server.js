require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const message = require('./message');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(message.string, message.image_url)
  // res.send('Text 7732496838 for some art')

});

app.post('/sms', (req, res) => {
  console.log('message received...')
  const incoming = req.body.Body
  const twiml = new MessagingResponse();
  const response = twiml.message();

  if (incoming.toLowerCase().includes('art')) {
    response.body('You\'re getting some art!\n');
    response.body(message.description);
    response.media(message.image);
  } else {
    response.body('no way! I only send art');
    response.media('https://media.giphy.com/media/l0MYSSCIrv8aUaBsQ/giphy.gif');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(response.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
