#include <TimeLib.h>


#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST "homeautomation-cfe46.firebaseio.com"
#define FIREBASE_AUTH "3NC5nc0q5uTvkTeUDZsH89urlXS4FTNi8kgQ8uLv"

//Wi-Fi settings
#define WIFI_SSID "P4nd0r424601"
#define WIFI_PASSWORD "YHgq9mxd9R8-EAS$"

time_t fecha;
const int relePin = D4;

void setup() {
  
  Serial.begin(9600);
  
 
  //Serial.print("connecting");


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
  setTime(Firebase.getInt("reloj_horas"), Firebase.getInt("reloj_minutos"), Firebase.getInt("reloj_segundos"), 13, 12, 2016);
  fecha = now();
  
  
  
}

void loop() {
  
    
  
  
  
  int sensorValue = analogRead(A0);
  float voltage = sensorValue * (5.0 / 1024.0);
  Firebase.setFloat("sensor_luz", voltage);

  int modoRele = Firebase.getInt("modo_rele");
  bool estadoReleHorario= Firebase.getBool("estado_rele_horario");
  bool activacionReleHorario= Firebase.getBool("activacion_rele_horario");
  if(activacionReleHorario){
    
    Serial.print("Hora: ");
    Serial.print(hour(now()));
    Serial.print(":");
    Serial.print(minute(now()));
    Serial.print(":");
    Serial.print(second(now()));
    Serial.print("\n");
                    
    if(minute(now())== Firebase.getInt("minutos") && hour(now()) == Firebase.getInt("hora") ){
      if(estadoReleHorario){
        digitalWrite(relePin, 0);
        Serial.print("Prendido");
      }
      else{
        digitalWrite(relePin, 1);
        Serial.print("Apagado");
      }
    }
    

  }
  else{
    if (modoRele == 1)
    {
      if (voltage > 2)
      {
        Serial.print("it is dark - ");
        digitalWrite(relePin, 0);
      }
      else
      {
        digitalWrite(relePin, 1);
      }
    }
    else
    {
      if (Firebase.getBool("estado_rele_manual"))
      {
        digitalWrite(relePin, 1);
      }
      else
      {

        digitalWrite(relePin, 0);
      }
    }
  }
  
  
  //Serial.println(voltage);

   delay(1000);
}
