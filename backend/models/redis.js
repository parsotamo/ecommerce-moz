const redis = require("redis");

client = redis.createClient();

client.on("connect", () => {
  console.log("Conectado ao Redis");
});

client.on("ready", () => {});

client.on("error", (error) => {
  console.log(error);
});

module.exports = client;
