#include <ESP8266WiFi.h>
#include <DHT.h>
#include <FirebaseArduino.h>
#include <Servo.h>

#define FIREBASE_HOST "homeautomation-cfe46.firebaseio.com"
#define FIREBASE_AUTH "3NC5nc0q5uTvkTeUDZsH89urlXS4FTNi8kgQ8uLv"

#define WIFI_SSID "P4nd0r424601"
#define WIFI_PASSWORD "YHgq9mxd9R8-EAS$"

int servo_pin = D7;   
Servo myservo;
    #define DHTPIN D1
    #define DHTTYPE DHT11
    
 
    DHT dht(DHTPIN, DHTTYPE);

void setup()
{
   

    myservo.attach(servo_pin);
    Serial.print("Wi-Fi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting...");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println();
    Serial.print("Connected to: ");
    Serial.println(WiFi.localIP());

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    //Firebase.set("temperatura01", 0);
    dht.begin();
}

 
void loop() {
  Serial.println(WiFi.localIP());
  delay(3000);
  float t = dht.readTemperature();
  Firebase.setFloat("temperatura01", t);
  
  int estado = Firebase.getInt("modo_servo");
  if(estado == 1){
    if(t >= 20){
      myservo.write(Firebase.getInt("angulo_auto_servo"));
    }else{
      myservo.write(0);
    }
    
  }else {
    myservo.write(Firebase.getInt("servo01"));
  }
  
 
  
  
  
}
