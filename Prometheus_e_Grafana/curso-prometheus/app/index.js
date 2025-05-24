var express = require("express");
var prom = require("prom-client");

var app = express();

const counter = new prom.Counter({
  name: "request_counter",
  help: "Counts the number of requests",
  labelNames: ["statusCode"],
});

const gauge = new prom.Gauge({
  name: "request_gauge",
  help: "Gauge of requests",
  labelNames: ["statusCode"],
});

app.get("/", function (req, res) {
  counter.labels(res.statusCode).inc();
  gauge.set(100 * Math.random());
  res.send("Hello World");
});

app.get("/metrics", async function (req, res) {
  res.set("Content-Type", prom.register.contentType);
  res.end(await prom.register.metrics());
});

app.listen(3000);
