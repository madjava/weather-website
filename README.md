# Weather Website

What to know what the weather is for a particular location or address?

The weather app is a Web service that communicates with 2  external REST API's to retrive the current weather info for the provided address.

Weather data is requested from the [DarkSky](https://darksky.net/dev) api and geolocation data from [MapBox](https://www.mapbox.com/) api.


## Local Setup

After checking out, run

```bash
npm install
```

To install the required libraries, you will also need a MapBox and DarkSky key and token. You can create free accounts on their respective websites.

The application will be expecting the respective tokens as envirnment variables

```bash
process.env.MAP_BOX_TOKEN
```

and

```bash
process.env.DARKSKY_TOKEN
```

To start the server run

```bash
npm start
```

You can also provide the required parameters like so

```bash
MAP_BOX_TOKEN=<you token> DARKSKY_TOKEN=<your token> npm start
```

This will start the web service with the required tokens proviced as environment variables.

## The Live Version

You can also check out a live version hosted on [Heroku](https://www.heroku.com/) by visiting the [Weather Service](https://felix-weather-application.herokuapp.com) or follow this url `https://felix-weather-application.herokuapp.com/`