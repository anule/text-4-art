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
  const twiml = new MessagingResponse();
  const message = twiml.message();
  let textBody = req.body.Body.toLowerCase();

  if (!textBody.includes('art') && !textBody.includes('thank') && !textBody.includes('loved') && !textBody.includes('liked')) {
    message.body('Hi! This is text-4-art 🖼, a service that brings the Art Institute of Chicago to you, one artwork at a time.\nTo receive a piece, please respond with a message that includes the word \'art\'.')
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else if (textBody.includes('thank') || textBody.includes('bye')) {
    message.body('Thank you for visiting text-4-art. Visit us again soon!')
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else {
    console.log('pinging AIC endpoint');
    get_random_object().then(data => {
      const twiml = new MessagingResponse();
      const response = twiml.message();
      console.log('got object, building message', data);
      const image =
        'https://lakeimagesweb.artic.edu/iiif/2/' +
        data.image_id +
        '/full/1000,/0/default.jpg';

      response.body(`Title: ${data.title}\n\nArtist: ${data.artist_display}\n\nDate: ${data.date_display}\n\nMedium: ${data.medium_display}\nwww.artic.edu/artworks/${data.id}`);
      response.media(image);

      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    }).then(obj => console.log('done', obj))
      .catch(e => console.error(e));
  }
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
