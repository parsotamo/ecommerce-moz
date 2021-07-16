const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  users: {
    type: Array,
    required: [true, "Conversa não tem usuários"],
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
