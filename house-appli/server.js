const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const ServiceLoader = require("threerest").ServiceLoader;

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
//const SSE = require('sse')
const SSE = require('express-sse');
var sse = new SSE();


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: ""
}));

app.use(express.static("static"));

app.get('/updates', sse.init);

// load the service Test 
ServiceLoader.loadServices(app, path.join(__dirname, "src", "services", "auth"));

// Serve the files on port 3000.
app.listen(4000, function () {
  /*var sse = new SSE(app);
  sse.on('connection', function(client) {
    client.send('hi there!');
  });*/

  console.log('Example app listening on port 4000!\n');
});