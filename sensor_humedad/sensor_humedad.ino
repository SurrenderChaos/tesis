#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>


//Firebase settings
#define FIREBASE_HOST "HomeAutomation.firebaseio.com"
#define FIREBASE_AUTH "3NC5nc0q5uTvkTeUDZsH89urlXS4FTNi8kgQ8uLv"

//Wi-Fi settings
#define WIFI_SSID "P4nd0r424601"
#define WIFI_PASSWORD "YHgq9mxd9R8-EAS$"

//Define trigger and echo digital pins
const int trigPin = 4;
const int echoPin = 3;

// The amount of time the ultrassonic wave will be travelling for
long duration = 0;
// Define the distance variable
double distance = 0;

void setup()
{

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

    // Ultrasonic sensor, set echo as Input and trigger as Output
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);

    Serial.begin(9600);
}

void loop()
{

    getDistance();
    // Prints the distance value to the serial monitor
    Serial.print("Distance: ");
    Serial.println(distance);
  
    delay(500);
}

void getDistance()
{
    // Clear trigPin
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    // trigPin HIGH por 10ms
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    //Reads echoPin, returns the travel time of the sound wave in ms
    duration = pulseIn(echoPin, HIGH);

    // Calculating the distance, in centimeters, using the formula described in the first section.
    distance = duration * 0.034 / 2;
  
    // Sends the distance value to Firebase
    Firebase.setFloat("distance", distance);

}
