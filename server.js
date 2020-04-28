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
  let sendGratitudeKeywords = /thank|bye|no/g
  let sendAppreciationKeywords = /nice|love|like/g

// like this until I can find an exclusionary regex
  if ( // if the message includes this string...
    // ...automatically send art
    !textBody.includes('art') &&
    !textBody.includes('yes') &&
    !textBody.includes('more') &&

    // ...send message of gratitude
    !textBody.includes('thank') &&
    !textBody.includes('bye') &&
    !textBody.includes('no') &&

    // ...send appreciation and ask if more is wanted
    !textBody.includes('love') &&
    !textBody.includes('like') &&
    !textBody.includes('nice')
  ) { // ...otherwise send an introduction
    console.log('sending introduction...');
    message.body(
      "Hi! This is text-4-art 🖼, a service that brings the Art Institute of Chicago to you, one artwork at a time.\nTo receive a randomly selected piece, please respond with a message that includes the word 'art'.\n\n(Note: Not affiliated with the Art Institute of Chicago)"
    );
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else if (textBody.search(sendGratitudeKeywords) >= 0) {
    console.log('sending gratitute. we love our fans!');
    message.body(
      'Thank you for visiting text-4-art. We appreciate your patronage. Visit us again soon!'
    );
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else if (textBody.search(sendAppreciationKeywords) >= 0) {
    console.log('sending note of appreciation. asking if they want more...');
    message.body(
      "We're glad you enjoyed our selection. Would you like to receive another work of art?"
    );
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } else {
    console.log('pinging AIC endpoint');
    get_random_object()
      .then(data => {
        const twiml = new MessagingResponse();
        const response = twiml.message();
        console.log('got object, building message', data);
        const image =
          'https://www.artic.edu/iiif/2/' +
          data.image_id +
          '/full/843,/0/default.jpg';

        response.body(
          `Title: ${data.title}\n\nArtist: ${data.artist_display}\n\nDate: ${data.date_display}\n\nMedium: ${data.medium_display}\nwww.artic.edu/artworks/${data.id}`
        );
        response.media(image);

        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
      })
      .then(obj => console.log('done', obj))
      .catch(e => console.error(e));
  }
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
