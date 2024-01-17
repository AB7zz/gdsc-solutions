#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "****************";
const char* password = "*************************";

const char* mqtt_server = "broker_address";
const int mqtt_port = 1883;
const char* mqtt_user = "yourMQTTusername";
const char* mqtt_password = "yourMQTTpassword";

WiFiClient espClient;
PubSubClient client(espClient);

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

const float DESIRED_INTERNAL_TEMP = 25.0;

DHT dht(DHTPIN, DHTTYPE);
int buttonState = 0;

void setup() {
  Serial.begin(9600);
  dht.begin();
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  pinMode(PRESSURE_PIN, INPUT);
  pinMode(HYDROGEL_PIN, INPUT);
  pinMode(PELTIER1_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
  pinMode(HEAT_COOL_PIN, OUTPUT);
  pinMode(PRESSURE_CONTROL_PIN, OUTPUT);
  pinMode(HUMIDITY_CONTROL_PIN, OUTPUT);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  float internalTemp = dht.readTemperature();
  float internalHumidity = dht.readHumidity();
  float internalPressure = analogRead(PRESSURE_PIN) * (5.0 / 1023.0);
  float hydrogelSaturation = analogRead(HYDROGEL_PIN) * (5.0 / 1023.0);
  float internalDewpoint = calculateDewPoint(internalTemp, internalHumidity);

  if (isnan(internalTemp) || isnan(internalHumidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  String data = String(internalTemp) + "," + String(internalHumidity) + "," +
                String(hydrogelSaturation) + "," + String(internalDewpoint) + "," +
                String(internalPressure);

  client.publish("sensor_data/internal", data.c_str());

  controlPeltier(internalTemp);

  delay(2000);
}

void setup_wifi() {
  delay(10);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      client.subscribe("sensor_data/external");
    } else {
      delay(5000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  Serial.println(message);

  int startIndex = 0;
  int endIndex = message.indexOf(',');

  float externalData[7]; // Array to store external data
  int dataIndex = 0;

  while (endIndex != -1 && dataIndex < 7) {
    externalData[dataIndex++] = message.substring(startIndex, endIndex).toFloat();
    startIndex = endIndex + 1;
    endIndex = message.indexOf(',', startIndex);
  }

  if (startIndex < message.length() && dataIndex < 7) {
    externalData[dataIndex] = message.substring(startIndex).toFloat();
  }

  float externalTemp = externalData[2];
  float externalPressure = externalData[4];
  float externalDewpoint = externalData[5];

  adjustTemperature(externalTemp);
  adjustPressure(externalPressure);
  adjustHumidity(externalDewpoint);
}


float calculateDewPoint(float temperature, float humidity) {
  return temperature - ((100 - humidity) / 5.0);
}

void controlPeltier(float internalTemp) {
  int buttonInput = digitalRead(BUTTON_PIN);

  if (buttonInput == LOW) {
    buttonState = !buttonState;
    delay(500);
  }

  if (buttonState == LOW) {
    if (internalTemp < DESIRED_INTERNAL_TEMP) {
      analogWrite(PELTIER1_PIN, 120); 
    } else if (internalTemp > DESIRED_INTERNAL_TEMP) {
      analogWrite(PELTIER1_PIN, 240); 
    } else {
      analogWrite(PELTIER1_PIN, 0);
    }
  } else {
    analogWrite(PELTIER1_PIN, buttonState ? 120 : 0);
  }
}