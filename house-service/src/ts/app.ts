import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";

import { ServiceLoader } from "threerest";

import { jwtMiddleWare } from "./secure/auth-jwt";
import { Injector } from "./inject/injector"
import { DB_KEY, DB_URL, DB_NAME, SSE_KEY } from "./app-const";

declare global {
  namespace Express {
    interface Response {
      sseSend?: (data:any, evtName?:string) => void;
    }
  }
}

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  Injector.register(SSE_KEY, []);
 
// Connection URL 
//var url = 'mongodb://localhost:27017/service-house';
// Use connect method to connect to the Server 
MongoClient.connect(DB_URL, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server MongoDB");

  Injector.register(DB_NAME, client/*.db(DB_NAME)*/);
  client.collection("users").deleteOne({name: "test"}).then(()=>{
    client.collection("users").insertOne({name: "test", password: "test", active: true}).then( result => result.ops[0]);
  });
  client.collection("users").insertOne({name: "test", password: "test", role: "user", active: true}).then( result => result.ops[0]);
 
  //db.close();
  var app:express.Application = express(); 
  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  }));
  app.use(cors());

  app.use(jwtMiddleWare);

  app.get('/sse', function(req, res) {
    Injector.getRegistered(SSE_KEY);
    console.log("connexion du client :", Injector.getRegistered(SSE_KEY).length);
    (<any> res).sseSend = function(data:any, evtName?:string) {
      if(evtName) res.write(`event: ${evtName}\n`);
      res.write("data: " + JSON.stringify(data) + "\n\n");
    };

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.sseSend("bonjour");
    res.on("close", ((index) => {
      return () => {
        console.log("deconnexion du client :", index);
        Injector.getRegistered(SSE_KEY).splice(index, 1);
      };
    })(Injector.getRegistered(SSE_KEY).length));
    Injector.getRegistered(SSE_KEY).push(res);
  });
  
  
  
  
  // load the service Test 
  ServiceLoader.loadServices(app, path.join(__dirname, "services"/*, "device"*/));
  ServiceLoader.loadServices(app, path.join(__dirname, "services", "device"));
  
  let serverHttp = app.listen(8181, () => {console.log("Express start on 8181...");});

});




