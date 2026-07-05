export const TEAM = [
  { name: "Taufeeq Iqbal Khan", reg: "2241011049",team:"drone" },
  { name: "Ansuman Parida", reg: "2241016188",team:"drone" },
  { name: "Aditya Ray", reg: "2241018099",team:"drone" },
  { name: "Aditya Padhi", reg: "2241016007",team:"drone" },
  { name: "Chinmoy Patra", reg: "2241016265",team:"drone" },
  { name: "Abhijeet Bej", reg: "2241002129",team:"drone" },
  { name: "Noble Paul", reg: "21516516",team:"web" },
];

export const SUBSYSTEMS = [
  {
    id: "flight",
    num: "01",
    label: "Flight & Power",
    color: "#c6f135",
    glyph: "⬡",
    components: [
      { name: "F405 Flight Controller", role: "64-bit onboard flying computer — stabilization, motor timing & sensor fusion", model: "/models/FlightController-optimized.glb" },
      { name: "4-in-1 ESC + PDB", role: "Motor drive via PWM · Distributes regulated 5V to all onboard electronics", model: "/models/esc-pdb-optimized.glb" },
      { name: "Brushless Motors ×4", role: "2× CW · 2× CCW for torque balance — Newton's 3rd law thrust generation", model: "/models/brushless-motor-optimized.glb" },
      { name: "Li-Po Battery", role: "Primary high-discharge power source feeding the entire system", model: "/models/lipo-battery-optimized.glb" },
    ],
    stat: "PWM",
    statLabel: "Motor Protocol",
    detail: "The F405 runs ArduPilot/Betaflight, continuously reading gyro and accelerometer data to compute PID corrections across roll, pitch, and yaw axes — feeding PWM signals to each motor within milliseconds.",
  },
  {
    id: "sensing",
    num: "02",
    label: "Sensing & Comms",
    color: "#7b6cff",
    glyph: "◈",
    components: [
      { name: "Arduino UNO", role: "Runs independently from FC · Reads DHT11 · Relays data over Bluetooth serial", model: "/models/arduino-uno-optimized.glb" },
      { name: "DHT11 Sensor", role: "Temperature & humidity · Data pin D2 · Updates every 2 seconds", model: "/models/dht11-optimized.glb" },
      { name: "HC-05 Bluetooth", role: "2.4 GHz · ~10 m range · 9600 baud rate — matches serial config", model: "/models/hc05-optimized.glb" },
    ],
    stat: "9600",
    statLabel: "Baud Rate",
    detail: "The Arduino operates in a fully isolated sensing loop, ensuring sensor data collection never interferes with flight stability. Data flows: DHT11 → Arduino Serial → HC-05 → Ground Station.",
  },
  {
    id: "nav",
    num: "03",
    label: "Navigation & Vision",
    color: "#ff6b35",
    glyph: "◉",
    components: [
      { name: "NEO-7M GPS", role: "UART · ±2.5 m horizontal accuracy · Position hold, RTH & mission waypoints", model: "/models/gps-neo7m-optimized.glb" },
      { name: "ESP32-CAM (OV2640)", role: "MJPEG stream on port 80 · Accessible via browser at http://ESP32-IP/stream", model: "/models/esp32-cam-optimized.glb" },
      { name: "FlySky i6 Receiver", role: "PPM output · 2.4 GHz AFHDS · 500 m–1 km line-of-sight range", model: "/models/flysky-receiver-optimized.glb" },
    ],
    stat: "MJPEG",
    statLabel: "Stream Format",
    detail: "ESP32-CAM hosts its own HTTP server — no external broker needed. GPS provides real-time lat/lon/alt to Mission Planner for waypoint execution and Return-to-Home safety features.",
  },
];

export const TELEMETRY = [
  { label: "Temp Read", value: "28", unit: "°C", color: "#c6f135" },
  { label: "Humidity", value: "62", unit: "%", color: "#7b6cff" },
  { label: "GPS Accuracy", value: "~2.5", unit: "m", color: "#ff6b35" },
  { label: "BT Range", value: "10", unit: "m", color: "#00d4aa" },
  { label: "RC Range", value: "1", unit: "km", color: "#ff3c7e" },
  { label: "Refresh Rate", value: "2", unit: "s", color: "#c6f135" },
];

export const FLOW_STEPS = [
  { id: "a", label: "Li-Po Battery", desc: "High-discharge source — feeds entire system via ESC" },
  { id: "b", label: "4-in-1 ESC + PDB", desc: "Drives 4 motors · Provides 5V regulated to FC, Arduino, GPS, Camera" },
  { id: "c", label: "F405 FC", desc: "PPM → stabilization loops → PWM motor control + GPS/sensor processing" },
  { id: "d", label: "Arduino UNO", desc: "DHT11 reads → Serial → HC-05 Bluetooth → Ground Station" },
  { id: "e", label: "ESP32-CAM", desc: "OV2640 → MJPEG HTTP server → Browser on port 80" },
  { id: "f", label: "Ground Station", desc: "Smartphone · Laptop · Mission Planner · Web browser" },
];

export const COMMS = [
  { proto: "PWM", medium: "Signal harness (FC → ESC)", range: "On-board", color: "#c6f135", pct: 100 },
  { proto: "UART", medium: "GPS serial (NEO-7M → FC)", range: "On-board", color: "#7b6cff", pct: 70 },
  { proto: "Bluetooth", medium: "HC-05 2.4 GHz (Arduino → Phone)", range: "~10 m", color: "#00d4aa", pct: 20 },
  { proto: "Wi-Fi", medium: "ESP32-CAM MJPEG stream", range: "LAN", color: "#ff6b35", pct: 45 },
  { proto: "RF AFHDS", medium: "FlySky i6 2.4 GHz", range: "~1 km", color: "#ff3c7e", pct: 90 },
];

export const CHALLENGES = [
  { title: "Calibration & Wiring", desc: "Sensor and motor tuning required iterative PID adjustments. Signal and power routing was consolidated via 4-in-1 ESC to reduce harness complexity.", icon: "⚡" },
  { title: "Wind Disturbance", desc: "External airflow caused flight instability during outdoor tests. Betaflight filter tuning and reduced P-gain on pitch/roll resolved oscillations.", icon: "💨" },
  { title: "Auto-Landing Accuracy", desc: "GPS drift near ground level caused imprecise landing. Failsafe altitude thresholds and descent rate tuning were applied to improve accuracy.", icon: "📍" },
];

export const FUTURE = [
  "AI-based image processing and smart terrain mapping",
  "Cloud data storage with remote monitoring dashboard",
  "Improved battery efficiency and extended flight duration",
  "Obstacle avoidance and advanced autonomous navigation",
];

export const SPECS = [
  { label: "Flight Controller", value: "F405 (64-bit)", icon: "flightController", stat: "Brain of the build", description: "Runs sensor fusion and PID loops in real time, constantly correcting motor speed to keep the drone level mid-air." },
  { label: "ESC", value: "4-in-1 with PDB", icon: "esc", stat: "1 board, 0 spare ESCs", description: "Merges motor control and power distribution into a single unit — less wiring, less weight, fewer points of failure." },
  { label: "GPS", value: "NEO-7M ±2.5m", icon: "gps", stat: "2.5–5m accuracy", description: "Tracks position via satellite for autonomous waypoints and Return-to-Launch — climbs, navigates home, lands itself." },
  { label: "Camera", value: "ESP32-CAM OV2640", icon: "camera", stat: "Live feed, port 80", description: "Streams MJPEG video over Wi-Fi straight to a browser — no app required, just open the IP address and watch." },
  { label: "Sensor", value: "DHT11 (D2 pin)", icon: "sensor", stat: "Reads every 2s", description: "Captures temperature and humidity mid-flight, turning the drone into an airborne weather probe." },
  { label: "RC System", value: "FlySky i6 AFHDS", icon: "rc", stat: "Up to 1km range", description: "2.4GHz frequency-hopping link gives low-latency manual override — the safety net behind every autonomous mission." },
  { label: "Microcontroller", value: "Arduino UNO", icon: "microcontroller", stat: "Runs independently", description: "Handles sensing and Bluetooth comms completely separate from the flight loop, so a sensor hiccup never touches stability." },
  { label: "BT Module", value: "HC-05 9600 baud", icon: "bluetooth", stat: "~10m range", description: "Pipes live temperature and humidity readings straight to a phone or laptop over 2.4GHz Bluetooth." },
  { label: "Motor Config", value: "4× Brushless (2CW+2CCW)", icon: "motorConfig", stat: "Newton's 3rd law, airborne", description: "Two clockwise, two counter-clockwise — opposing spin cancels torque, letting tiny speed shifts steer roll, pitch, and yaw." },
  { label: "Power", value: "Li-Po (primary)", icon: "power", stat: "Single power source", description: "Feeds the ESC, which fans power out to motors, flight controller, GPS, and Arduino from one battery." },
  { label: "Video Protocol", value: "MJPEG on port 80", icon: "videoProtocol", stat: "Browser-ready", description: "Continuous JPEG frames over HTTP multipart response — open /stream and you're watching live." },
  { label: "Mission Software", value: "Mission Planner", icon: "missionSoftware", stat: "Ground control HQ", description: "Calibrates the ESC and sensors, sets flight modes, and monitors GPS, altitude, and battery in real time." },
];


export const GALLERY_SLOTS = [
  { id: "frame", label: "Frame Assembly", hint: "Drop photo here" },
  { id: "wiring", label: "ESC & Wiring", hint: "Drop photo here" },
  { id: "gps", label: "GPS Mount", hint: "Drop photo here" },
  { id: "camera", label: "Camera Rig", hint: "Drop photo here" },
  { id: "maiden", label: "Maiden Flight", hint: "Drop photo here" },
];