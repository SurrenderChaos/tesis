
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST "homeautomation-cfe46.firebaseio.com"
#define FIREBASE_AUTH "3NC5nc0q5uTvkTeUDZsH89urlXS4FTNi8kgQ8uLv"

//Wi-Fi settings
#define WIFI_SSID "P4nd0r424601"
#define WIFI_PASSWORD "YHgq9mxd9R8-EAS$"


const int relePin = D4;

void setup() {
  Serial.begin(9600);


  pinMode(relePin, OUTPUT);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  
}

void loop() {
  
  int sensorValue = analogRead(A0);
  float voltage = sensorValue * (5.0 / 1024.0);
  
  int modoRele = Firebase.getInt("modo_rele");
  
  if (modoRele == 1)
  {
    if(voltage > 2){
    Serial.print ("it is dark - ");
    digitalWrite(relePin, 1);
    }else{
      digitalWrite(relePin, 0);
      }
    
  }
  else
  {
    digitalWrite(relePin, Firebase.getInt("estado_rele_manual"));
  }
  Serial.println(voltage);

   delay(1000);
}
