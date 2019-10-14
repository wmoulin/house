#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// configuration du reseau wifi
const char* ssid     = "freebox_XGFUEH";        // Nom du reseau
const char* password = "WMOULIN_wmoulin_SGRELIER_024034";     // cle 

// valeurs pour le serveur Web
const String host = "192.168.0.47";
const String id = "5ac67283d8b4a9546af7a776";
const int httpPort = 8181;
const String ressource = "http://" + host + ":" + httpPort + "/devices/" + id + "/active";

void setup() {
  pinMode(D0, OUTPUT); //Declare Pin mode
  Serial.begin(115200);
 
  // connexion au reseau wifi
  Serial.print("Connexion au WiFi ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);    // On lance la connexion au reseau wifi
  
  while (WiFi.status() != WL_CONNECTED) { // On attend la connexion
    delay(500);
    Serial.print(".");
  }

  Serial.println("WiFi connecté");  
}

void loop() {
    
  HTTPClient http;
  
  if(WiFi.status() == WL_CONNECTED) { // verification de la connexion
          
      // démarrer la connexion et envoyer les entêtes HTTP
      http.begin(ressource);
      
      // démarrer la connexion et envoyer les entêtes HTTP
      http.addHeader("Content-type", "application/json");
      //int httpCode = http.sendRequest("PATCH", (uint8_t *) payload.c_str(), payload.length());
      int httpCode = http.sendRequest("GET");
    
      // httpCode sera négatif si on rencontre une erreur
      if(httpCode > 0) {
        // les entêtes HTTP ont été envoyés et
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);
        
        // si le serveur TOM répond par OK
        if(httpCode == HTTP_CODE_OK) {
          Serial.println("[HTTP] GET... OK!");
          String payload = http.getString();
          Serial.println(payload == "true");
          if(payload == "true") {
            digitalWrite(D0, HIGH); 
          } else {
            digitalWrite(D0, LOW); 
          }
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %d - %s\n", httpCode, http.errorToString(httpCode).c_str());
      }
      
      http.end();
   
      Serial.println();
      Serial.println("done");
      delay(3000); // attente de 3s avant de relancer le traitement
    }


  
}


