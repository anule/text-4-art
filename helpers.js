// adapted from AICbot by @backspace https://glitch.com/edit/#!/aicbot?path=helpers.js:1:0

const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
  get_random_object: function() {
    let timeStamp = Math.floor(Date.now() / 1000);
    let artworkRequest = {
      "resources": "artworks",
      "fields": [
        "id",
        "title",
        "artist_display",
        "image_id",
        "date_display",
        "medium_display"
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

    // Query Art Insititue of Chicago API and return response
    return fetch('https://api.artic.edu/api/v1/search', {
      method: 'POST',
      body: JSON.stringify(artworkRequest),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(obj => obj.data[0])
      .catch(e => console.error(e));
  }
};
