const express = require("express");
const client = require("prom-client");

const app = express();

const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "This is Rest API Response Time in seconds",
  labelNames: ["method", "route", "status_code"],
  // buckets: [0.1, 5, 15, 50, 100, 500],
});

function startMetricsServer() {
  console.log("Metrics data");
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });
  app.listen(5556, () => {
    console.log("Metrics Server Started at port " + 5556);
  });
}

module.exports = {
  restResponseTimeHistogram,
  startMetricsServer,
};
