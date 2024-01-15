#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11
#define PRESSURE_PIN A0
#define HYDROGEL_PIN A1
#define PELTIER1_PIN 6
#define BUTTON_PIN 3

DHT dht(DHTPIN, DHTTYPE);
int buttonState = 0;

void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(PRESSURE_PIN, INPUT);
  pinMode(HYDROGEL_PIN, INPUT);
  pinMode(PELTIER1_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  float internalTemp = dht.readTemperature();
  float internalHumidity = dht.readHumidity();

  float internalPressure = analogRead(PRESSURE_PIN) * (5.0 / 1023.0);
  float hydrogelSaturation = analogRead(HYDROGEL_PIN) * (5.0 / 1023.0);
  float internalDewpoint = calculateDewPoint(internalTemp, internalHumidity);

  if (isnan(internalTemp) || isnan(internalHumidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Internal Temperature: "); Serial.println(internalTemp);
  Serial.print("Internal Humidity: "); Serial.println(internalHumidity);
  Serial.print("Hydrogel Saturation Level: "); Serial.println(hydrogelSaturation);
  Serial.print("Internal Dewpoint: "); Serial.println(internalDewpoint);
  Serial.print("Internal Pressure: "); Serial.println(internalPressure);

  controlPeltier();

  delay(2000);
}

float calculateDewPoint(float temperature, float humidity) {
  return temperature - ((100 - humidity) / 5.0);
}

void controlPeltier() {
  int buttonInput = digitalRead(BUTTON_PIN);

  if (buttonInput == LOW) {
    buttonState = !buttonState;
    delay(500);
  }

  if (buttonState == HIGH) {
    analogWrite(PELTIER1_PIN, 120); 
  } else {
    analogWrite(PELTIER1_PIN, 0);
  }

  delay(500);
}