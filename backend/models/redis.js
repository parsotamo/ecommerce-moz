const redis = require("redis");

if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  var client = require("redis").createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = require("redis").createClient();
}

client.on("connect", () => {
  console.log("Conectado ao Redis");
});

client.on("ready", () => {});

client.on("error", (error) => {
  console.log(error);
});

module.exports = client;
