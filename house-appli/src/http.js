

export class Http {

  constructor() {
  }

  static post(url, body) {
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
    return fetch(new Request(Http.DOMAIN + url, {headers: {'content-type': 'application/json'}, method: "PATCH", mode: 'cors', body: JSON.stringify(body)}))
    .then(function(response) {
      if(!response.ok) {
        return response.text().then((text)=> {
          throw new Error(text);
        })
      } 
      return response.json();
    })
  }

  static get(url) {
    return fetch(new Request(Http.DOMAIN + url, {method: "GET", mode: 'cors'}))
    .then(function(response) {
      if(!response.ok) {
        return response.text().then((text)=> {
          throw new Error(text);
        })
      } 
      return response.json();
    })
  }

  static del(url) {
    return fetch(new Request(Http.DOMAIN + url, {method: "DELETE", mode: 'cors'}))
    .then(function(response) {
      if(!response.ok) {
        return response.text().then((text)=> {
          throw new Error(text);
        })
      } 
      return response.json();
    })
  }

}

Http.DOMAIN = "http://localhost:8080/";