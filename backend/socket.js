const {
  removeAllUsersFromListRedis,
  removeUsersFromListRedis,
  addUsersToListRedis,
} = require("./models/heartbeat");
const AppError = require("./utils/AppError");

let io;

exports.init = (httpServer) => {
  io = require("socket.io")(httpServer);
  removeAllUsersFromListRedis("CM:USER:ON", (e, r) => {});
  return io;
};

exports.getIO = () => {
  if (!io) return new AppError("Socket.io não inicializou", 500);
  return io;
};

// exports.socketManager = (socket) => {
//   console.log("connected");
//   socket.on("join-user", (data, cb) => {
//     removeUsersFromListRedis("CM:USER:OFF", data._id);
//     const onlineUser = {
//       time: new Date(),
//       _id: data._id,
//     };
//     addUsersToListRedis("CM:USER:ON", data._id, onlineUser, (e, r) => {
//       if (e) return cb(e);
//       socket._id = data._id;
//       socket.join(data._id);
//       socket.broadcast.emit("new-online-user", onlineUser);
//       cb();
//     });
//   });
//   socket.on("send-msg", (data, cb) => {
//     io.to(data.receiver).emit("receive-msg", data);
//     cb();
//   });

//   socket.on("disconnect", () => {
//     const { _id } = socket;

//     if (_id) {
//       removeUsersFromListRedis("CM:USER:ON", _id);
//       const offlineUser = {
//         time: new Date(),
//         _id,
//       };
//       addUsersToListRedis("CM:USER:OFF", _id, offlineUser, (e, r) => {
//         console.log("Usuário saiu", r);
//       });
//       socket.broadcast.emit("new-offline-user", offlineUser);
//     }
//   });
// };
