export const DB_KEY = "my_db";
export const DB_NAME = "service-house";
export const DB_URL = "mongodb://localhost:27017/"+DB_NAME;

export const SSE_KEY = "sse_conn";

export const convert = function(obj, ConvertClass) {
  let instance = new ConvertClass();
  if (obj) {
      for (var prop in obj) {
          if (instance.hasOwnProperty(prop) && typeof instance[prop] != "function") {
              instance[prop] = obj[prop];
          }
      }
  }
  return instance;
};

