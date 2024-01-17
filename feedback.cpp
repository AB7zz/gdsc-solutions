#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11
#define PRESSURE_PIN A0
#define HYDROGEL_PIN A1
#define PELTIER1_PIN 6
#define BUTTON_PIN 3
#define HEAT_COOL_PIN 7
#define PRESSURE_CONTROL_PIN 8
#define HUMIDITY_CONTROL_PIN 9

const float MAX_EXT_TEMPERATURE = 30.0; 
const float MIN_EXT_TEMPERATURE = 10.0;
const float MAX_EXT_PRESSURE = 1.2;    
const float MIN_EXT_PRESSURE = 0.8;    
const float MAX_EXT_DEWPOINT = 15.0;   
const float MIN_EXT_DEWPOINT = 5.0;    

DHT dht(DHTPIN, DHTTYPE);
int buttonState = 0;

void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(PRESSURE_PIN, INPUT);
  pinMode(HYDROGEL_PIN, INPUT);
  pinMode(PELTIER1_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
  pinMode(HEAT_COOL_PIN, OUTPUT);
  pinMode(PRESSURE_CONTROL_PIN, OUTPUT);
  pinMode(HUMIDITY_CONTROL_PIN, OUTPUT);
}

void loop() {
  float internalTemp = dht.readTemperature();
  float internalHumidity = dht.readHumidity();
  float internalPressure = analogRead(PRESSURE_PIN) * (5.0 / 1023.0);
  float internalDewpoint = calculateDewPoint(internalTemp, internalHumidity);

  float externalTemp = readExternalTemperature();
  float externalPressure = readExternalPressure();
  float externalDewpoint = readExternalDewPoint();

  adjustTemperature(externalTemp);
  adjustPressure(externalPressure);
  adjustHumidity(externalDewpoint);

  controlPeltier();

  delay(2000);
}

float readExternalTemperature() { return 0.0; } 
float readExternalPressure() { return 1.0; }    
float readExternalDewPoint() { return 10.0; }   

void adjustTemperature(float externalTemp) {
  if (externalTemp > MAX_EXT_TEMPERATURE) {
    digitalWrite(HEAT_COOL_PIN, LOW); 
  } else if (externalTemp < MIN_EXT_TEMPERATURE) {
    digitalWrite(HEAT_COOL_PIN, HIGH); 
  }
}

void adjustPressure(float externalPressure) {
  if (externalPressure > MAX_EXT_PRESSURE) {
  } else if (externalPressure < MIN_EXT_PRESSURE) {
  }
}

void adjustHumidity(float externalDewpoint) {
  if (externalDewpoint > MAX_EXT_DEWPOINT) {
  } else if (externalDewpoint < MIN_EXT_DEWPOINT) {
  }
}

float calculateDewPoint(float temperature, float humidity) {
  return temperature - ((100 - humidity) / 5.0);
}

const float DESIRED_INTERNAL_TEMP = 25.0; 

void controlPeltier() {
  int buttonInput = digitalRead(BUTTON_PIN);

  if (buttonInput == LOW) {
    buttonState = !buttonState;
    delay(500); 
  }

  float internalTemp = dht.readTemperature(); 

  if (buttonState == LOW) {
    if (internalTemp < DESIRED_INTERNAL_TEMP) {
      analogWrite(PELTIER1_PIN, 120); 
    } else if (internalTemp > DESIRED_INTERNAL_TEMP) {
      analogWrite(PELTIER1_PIN, 240); 
    } else {
      analogWrite(PELTIER1_PIN, 0);
    }
  } else {
    if (buttonState == HIGH) {
      analogWrite(PELTIER1_PIN, 120);
    } else {
      analogWrite(PELTIER1_PIN, 0);
    }
  }
}
