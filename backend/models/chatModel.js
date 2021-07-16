const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: [true, "Conversa Id é obrigatório"],
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Inválido. Mensagem não tem origem."],
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Inválido. Mensagem não tem destino."],
  },
  message: {
    type: String,
  },
  image: {
    type: String,
  },
  voice: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
