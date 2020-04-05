// from AICbot by @backspace https://glitch.com/edit/#!/aicbot?path=helpers.js:1:0

const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
  get_random_object: function(cb) {
    let timeStamp = Math.floor(Date.now() / 1000);
    let artworkRequest = {
      "resources": "artworks",
      "fields": [
        "id",
        "title",
        "artist_display",
        "image_id",
        "date_display"
      ],
      "boost": false,
      "limit": 1,
      "query": {
        "function_score": {
          "query": {
            "constant_score" : {
              "filter": {
                "exists": {
                  "field": "image_id"
                }
              }
            }
          },
          "boost_mode": "replace",
          "random_score": {
            "field": "id",
            "seed": timeStamp
          }
        }
      }
    };

    var options = {
      uri: 'https://aggregator-data.artic.edu/api/v1/search',
      method: 'POST',
      json: artworkRequest
    };

    fetch('https://aggregator-data.artic.edu/api/v1/search', {
      method: 'POST',
      body: JSON.stringify(artworkRequest),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json())
      .then(object => {
        console.log('got an object', object)
        cb(object.data[0])
      })
      .catch(e => console.log(e.statusCode, e.message));
  },
  load_image: function(url, cb) {
    console.log('loading remote image...');
    request({ url: url, encoding: null }, function(err, res, body) {
      if (!err && res.statusCode == 200) {
        var b64content = 'data:' + res.headers['content-type'] + ';base64,';
        console.log('image loaded...');
        cb(null, body.toString('base64'));
      } else {
        console.log('ERROR:', err);
        cb(err);
      }
    });
  },
  download_file: function(uri, filename, cb) {
    request.head(uri, function(err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', cb);
    });
  }
};
