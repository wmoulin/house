

import request from "superagent"

export class Http {

  constructor() {
  }

  static post(url, body) {
    return request
   .post(Http.DOMAIN + url)
   .send(body)
   .set('Content-Type', 'application/json')
   .set('Accept', 'application/json')
   .then(function(res) {
      return JSON.stringify(res.body);
   }).catch((e) => {
      throw new Error(e);
   });
  }

  static get(url) {
    return request
   .get(Http.DOMAIN + url)
   .set('Content-Type', 'application/json')
   .set('Accept', 'application/json')
   .then(function(res) {
      return res.body;
   }).catch((e) => {
      throw new Error(e);
   });
  }

  static postOld(url, body) {
    return fetch(new Request(Http.DOMAIN + url, {headers: {'content-type': 'application/json'}, method: "POST", mode: 'cors', body: JSON.stringify(body)}))
    .then(function(response) {
      if(!response.ok) {
        return response.text().then((text)=> {
          throw new Error(text);
        })
      } 
      return response.json();
    })
  }

  static patch(url, body) {
    return request
    .patch(Http.DOMAIN + url)
    .send(body)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .then(function(res) {
       return JSON.stringify(res.body);
    }).catch((e) => {
       throw new Error(e);
    });
  }

  static getOld(url) {
    return fetch(new Request(Http.DOMAIN + url, {method: "GET", mode: 'cors'}))
    .then(function(response) {
      if(!response.ok) {
        return response.text().then((text)=> {
          throw new Error(text);
        })
      } 
      return response.json();
    });
  }

  static del(url) {
    request
   .del(Http.DOMAIN + url)
   .set('Content-Type', 'application/json')
   .set('Accept', 'application/json')
   .then(function(res) {
      return res.body;
   }).catch((e) => {
      throw new Error(e);
   });
  }

}

Http.DOMAIN = "http://localhost:8181/";