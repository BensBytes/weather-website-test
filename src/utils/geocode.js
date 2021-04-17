const request = require('postman-request');
require('dotenv').config();

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

    request({url, json: true}, (error, {body} ) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            callback(`Location services returned no results for '${address}'`); // second argument is undefined since left blank
        } else {
            const features = body.features[0];
            callback(undefined, {
                location: features.place_name,
                latitude: features.center[1],
                longitude: features.center[0]
            });
        }
    });
}

module.exports = geocode;