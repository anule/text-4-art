require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const message = require('./message.json')
const { get_random_object } = require('./helpers')

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Text 7732496838 for some art')
});

app.post('/sms', (req, res) => {
  console.log('message received...')
  const twiml = new MessagingResponse();
  const response = twiml.message();

  console.log('pinging AIC endpoint');
  get_random_object();

  const data = message.data[0]
  const image =
    'https://lakeimagesweb.artic.edu/iiif/2/' +
    data.image_id +
    '/full/1000,/0/default.jpg';
  const title = 'Title: ' + data.title
  const artist = 'Artist: ' + data.artist_display
  const date = 'Date: ' + data.date_display
  const medium = 'Medium: ' + data.medium_display;

  response.body(title)
  response.body(artist)
  response.body(date)
  response.body(medium)
  response.media(image);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
