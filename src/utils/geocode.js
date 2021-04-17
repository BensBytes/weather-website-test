const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmFicmFuZHQiLCJhIjoiY2tuYzJnYzlwMXZ5NTJxbjFiYTA2bWw3diJ9.8bwyijTnXb93TbNcghAKgw&limit=1`;

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