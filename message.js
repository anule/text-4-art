const helpers = require('./helpers');

const art = helpers.get_random_object((object) => { return object; })
const description = 'Title: ' + art.title +
                    ', Artist: ' + art.artist_display +
                    ', Date: ' + art.date_display +
                    ', Medium: ' + art.medium_display;
const image = 'https://lakeimagesweb.artic.edu/iiif/2/' + art.image_id + '/full/1000,/0/default.jpg';

module.exports = {
  description: description,
  image: image
}
