#include <ESP8266WiFi.h>
#include <DHT.h>
#include <FirebaseArduino.h>


//Firebase settings
#define FIREBASE_HOST "homeautomation-cfe46.firebaseio.com"
#define FIREBASE_AUTH "3NC5nc0q5uTvkTeUDZsH89urlXS4FTNi8kgQ8uLv"

//Wi-Fi settings
#define WIFI_SSID "P4nd0r424601"
#define WIFI_PASSWORD "YHgq9mxd9R8-EAS$"

//Define trigger and echo digital pins
const int trigPin = 4;
const int echoPin = 3;
pinMode(trigPin, OUTPUT);



void setup()
{
    // Definimos el pin digital donde se conecta el sensor
    #define DHTPIN 2
    // Dependiendo del tipo de sensor
    #define DHTTYPE DHT11
 
    // Inicializamos el sensor DHT11
    DHT dht(DHTPIN, DHTTYPE);


    // Connect to Wi-Fi
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
    Serial.begin(9600);
    dht.begin();
}

 
void loop() {
    // Esperamos 5 segundos entre medidas

    delay(5000);
 
  // Leemos la humedad relativa
  float h = dht.readHumidity();
  // Leemos la temperatura en grados centígrados (por defecto)
  float t = dht.readTemperature();
  // Leemos la temperatura en grados Fahreheit
  float f = dht.readTemperature(true);
 
  // Comprobamos si ha habido algún error en la lectura
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }
 
  // Calcular el índice de calor en Fahreheit
  float hif = dht.computeHeatIndex(f, h);
  // Calcular el índice de calor en grados centígrados
  float hic = dht.computeHeatIndex(t, h, false);
  Firebase.setFloat("temperatura01", t);
}


