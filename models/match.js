const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  dogOneId: { type: Schema.Types.ObjectId, ref: "Dog" },
  dogTwoId: { type: Schema.Types.ObjectId, ref: "Dog" },
  dogOneAnswer: {
    type: String,
    enum: ["like", "reject", "pending"],
    default: "pending",
  },
  dogTwoAnswer: {
    type: String,
    enum: ["like", "reject", "pending"],
    default: "pending",
  },
  success: {
    type: String,
    enum: ["success", "rejected", "awaiting"],
    default: "awaiting",
  },
});

const Match = mongoose.Model("Match", matchSchema);

module.exports = Match;
