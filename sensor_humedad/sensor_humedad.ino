#include <ESP8266WiFi.h>
#include <DHT.h>
#include <FirebaseArduino.h>
#include <Servo.h>

//Firebase settings
#define FIREBASE_HOST "homeautomation-cfe46.firebaseio.com"
#define FIREBASE_AUTH "3NC5nc0q5uTvkTeUDZsH89urlXS4FTNi8kgQ8uLv"

//Wi-Fi settings
#define WIFI_SSID "P4nd0r424601"
#define WIFI_PASSWORD "YHgq9mxd9R8-EAS$"

int servo_pin = D7;  // for ESP8266 microcontroller
Servo myservo;
 // Definimos el pin digital donde se conecta el sensor
    #define DHTPIN D1
    // Dependiendo del tipo de sensor
    #define DHTTYPE DHT11
    
 
    // Inicializamos el sensor DHT11
    DHT dht(DHTPIN, DHTTYPE);

void setup()
{
   

    myservo.attach(servo_pin);
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
    Firebase.set("servo01", 0);
    Firebase.set("temperatura01", 0);
    Serial.begin(9600);
    dht.begin();
}

 
void loop() {
  Serial.println(WiFi.localIP());
  delay(1000);
  //Firebase.getInt("servo01");//codigo con el que se obtiene el valor del servo en firebase para moverlo 
    // Esperamos 5 segundos entre medidas

  //delay(3000);
 
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
  int angle = 0;
  if(t > 19){
    angle = 45;
    myservo.write(angle);
  }else{
    angle = 0;
    myservo.write(angle);
  }
  Firebase.setFloat("temperatura01", t);
  //codigo para abrir una ventana cuando la temperatura supera los 25 grados 
  
}
