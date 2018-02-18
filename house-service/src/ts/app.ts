import * as express from "express";
import * as path from "path";

import { ServiceLoader } from "threerest";

import ServiceTest from "./services/service-test";

import { Injector } from "./inject/injector"
import { DB_KEY } from "./app-const";

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/service-house';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  Injector.register(DB_KEY, db);
 
  db.close();
});



var app:express.Application = express(); 

// load the service Test 
ServiceLoader.loadServices(app, path.join(__dirname, "services", "device"));

app.listen(8080, () => {console.log("Express start...");});
