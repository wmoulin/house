import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";

import { ServiceLoader } from "threerest";

import ServiceTest from "./services/service-test";

import { Injector } from "./inject/injector"
import { DB_KEY, DB_URL, DB_NAME } from "./app-const";

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
//var url = 'mongodb://localhost:27017/service-house';
// Use connect method to connect to the Server 
MongoClient.connect(DB_URL, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server MongoDB");

  Injector.register(DB_NAME, client/*.db(DB_NAME)*/);
 
  //db.close();
  var app = express();
  app.use(express.static("public"))
  app.use(bodyParser.json({}));

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
  }));
  app.use(cors());

  
  // load the service Test 
  ServiceLoader.loadServices(app, path.join(__dirname, "services", "device"));
  
  app.listen(8181, () => {console.log("Express start on 8080...");});
});



