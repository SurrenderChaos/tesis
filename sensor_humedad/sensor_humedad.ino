#include <TimeLib.h>



#include <ESP8266WiFi.h>
#include <DHT.h>
#include <FirebaseArduino.h>
#include <Servo.h>

//las credenciales se deben quitar del codigo en un archivo properties
#define FIREBASE_HOST "homeautomation-cfe46.firebaseio.com"
#define FIREBASE_AUTH "3NC5nc0q5uTvkTeUDZsH89urlXS4FTNi8kgQ8uLv"
//se piede el nombre y password de cualquier red en la app y esta a su vez guarda la informacion
//en firebase
//definir la password con  Firebase.getInt("nombre_de_variable_de_firebase");
//se deben almacenar las password encriptadas
#define WIFI_SSID "P4nd0r424601"
#define WIFI_PASSWORD "YHgq9mxd9R8-EAS$"

time_t fecha;

int servo_pin = D7;   
Servo myservo;
    #define DHTPIN D1
    #define DHTTYPE DHT11
    
 
    DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  Serial.begin(9600);
   
Serial.print("Wi-Fi...");
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
    setTime(Firebase.getInt("reloj_horas"), Firebase.getInt("reloj_minutos"), Firebase.getInt("reloj_segundos"), 13, 12, 2016);
    fecha = now();
    dht.begin();
}

 
void loop() {
  Serial.println(WiFi.localIP());
  delay(3000);
  float t = dht.readTemperature();
  Firebase.setFloat("temperatura01", t);
  
  int estado = Firebase.getInt("estadoServo");
  int estadoServoHorario= Firebase.getInt("estado_servo_horario");
  bool activacionServoHorario= Firebase.getBool("activacion_servo_horario");
  if(activacionServoHorario){
    Serial.print("Hora: ");
    Serial.print(hour(now()));
    Serial.print(":");
    Serial.print(minute(now()));
    Serial.print(":");
    Serial.print(second(now()));
    Serial.print("\n");

    if(minute(now())== Firebase.getInt("minutos") && hour(now()) == Firebase.getInt("hora") ){
      
        myservo.write(estadoServoHorario);
        Serial.print("Posicion 1");
      
      
    }
    
    
    
  }
  else{
    if(estado == 1){
    if(t >= 20){
      myservo.write(Firebase.getInt("angulo_auto_servo"));
    }else{
      myservo.write(0);
    }
    
  }else {
    myservo.write(Firebase.getInt("angulo_servo"));
  }
    
  }
  
  
 
  
  
  
}
