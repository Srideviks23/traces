const express = require("express");
const cors = require("cors");
const http = require("http");
const prometheus = require("prom-client");
const {
  restResponseTimeHistogram,
  startMetricsServer,
} = require("./metrics.js");
const PORT = process.env.PORT || "5555";
const app = express();

// Define a counter metric for request counts
const requestCounter = new prometheus.Counter({
  name: "nodejs_requests_total",
  help: "Total number of requests processed",
  labelNames: ["method"],
});

app.use(cors());
app.use(express.json());

// Respond to all GET requests
app.all("/", (req, res) => {
  requestCounter.labels(req.method).inc(); // Increment request count for GET requests
  res.json({ method: req.method, message: "Hello World", ...req.body });
});

// Respond to all POST requests
app.post("/", (req, res) => {
  requestCounter.labels(req.method).inc(); // Increment request count for POST requests
  res.json({
    method: req.method,
    message: "Received POST request",
    ...req.body,
  });
});

// Respond with 404 for GET request to /404 route
app.get("/404", (req, res) => {
  requestCounter.labels("GET").inc(); // Increment request count for 404 GET requests
  res.sendStatus(404);
});

// Expose Prometheus metrics endpoint
app.get("/metrics", (req, res) => {
  res.set("Content-Type", prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});

function startServer(port) {
  const server = http.createServer(app);

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use. Trying another port...`);
      setTimeout(() => {
        startServer(port + 1);
      }, 1000);
    } else {
      console.error("Server error:", err);
    }
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer(parseInt(PORT, 10)); // Start the server with the initial port

startMetricsServer();

//In this case, the Express.js server handles HTTP requests, responds to different routes (such as /, /404, and /metrics), and exposes functionalities like counting requests and serving metrics.
// It follows the principles of a microservice by focusing on a single responsibility - handling HTTP requests for a specific service or application.
