require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { get_random_object } = require('./helpers')

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Text +17732496838 for some art')
});

app.post('/sms', (req, res) => {
  console.log('message received...')
  console.log('pinging AIC endpoint');
  get_random_object().then(data => {
    const twiml = new MessagingResponse();
    const response = twiml.message();
    console.log('got object, building message', data);
    const image =
      'https://lakeimagesweb.artic.edu/iiif/2/' +
      data.image_id +
      '/full/1000,/0/default.jpg';
    const title = 'Title: ' + data.title;
    const artist = 'Artist: ' + data.artist_display;
    const date = 'Date: ' + data.date_display;
    const medium = 'Medium: ' + data.medium_display;

    response.body(title);
    response.body(artist);
    response.body(date);
    response.body(medium);
    response.media(image);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }).then(obj => console.log('done', obj))
    .catch(e => console.error(e));
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
