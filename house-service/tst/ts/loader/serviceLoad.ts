import * as express from "express";
import * as request from "supertest";
import * as assert from "assert";

import "mocha";

import serviceTest from "../../../src/ts/services/service-test";
import { ServiceLoader } from "threerest";

describe("Laod simple simple service rest", function () {
  it("should return a result", function (done) {

    let app = express();
    ServiceLoader.loadService(app, new serviceTest());

    


    request(app)
      .get("/test")
      .expect('{"name":"test"}', done);
  });
    
  it("should return a result", function (done) {

    let app = express();
    ServiceLoader.loadService(app, new serviceTest());

    request(app)
      .get("/test/12")
      .expect('{"name":"test","id":{"id":"12"}}', done);

      
  });

});
