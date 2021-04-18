const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


const viewsPath = path.join(__dirname, '..\\templates\\views');
const partialsPath = path.join(__dirname, '..\\templates\\partials');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(path.join(__dirname,'..\\public')));

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Katie D.'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        mainImage: 'images/chd.gif',
        name: 'Kelly',
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a test of the emergency broadcasting system. This is only a test. In the event of an actual emergency you would already be dead.',
        name: 'Katie'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An address must be provided.'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: `Error in retrieving the latitute and longitude for the address ${req.query.address}.`});
        }
        forecast(latitude, longitude, (error, {weather_description: description, temperature, feels_like:feelsLike} = {}) => {
            if (error) {
                return res.send({error: `Error in retrieving the forecast from latitude ${latitude} and longitude ${longitude} for the address ${address}.`});
            }
            return res.send({
                location,
                forecast: description,
                temperature,
                feelsLike,
                address: req.query.address
            })
        })    
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: 'You must provide a search term.'});
    } 
    
    const prod = ['bike','tire','pump','wheel','tablet','total recall','apple','peach','turkey'];
    console.log(`[^[${req.query.search.toUpperCase()}${req.query.search.toLowerCase()}]\\w*`);
    res.send(prod.filter(item => { return item.match(`^[${req.query.search.toUpperCase()}${req.query.search.toLowerCase()}]\\w*`) }));
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Wump wump wump',
        name: '404 Dude',
        message: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 - Wump wump wump',
        message: 'Page not found.',
        name: '404 Dude'
    });
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
