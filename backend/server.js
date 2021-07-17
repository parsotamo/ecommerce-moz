const mongoose = require("mongoose");
// const socket = require("./socket");

const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected successfully!");
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log(err.name, err.message);
    process.exit(1);
  });
});
// const io = socket.init(server);
// io.on("connection", socket.socketManager);
