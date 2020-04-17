const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SCHEMA
const dogSchema = new Schema(
  {
    dogName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 0, required: true },
    phoneNumber: { type: String, required: true },
    breed: { type: String, required: true },
    image: {
      type: String,
      default: "http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/256/22215-dog-icon.png",
    },
    activity: { type: String },
    interactions: [{ type: Schema.Types.ObjectId, ref: "Match" }],
    searchPreferences: {
      breed: { type: String },
      ageMin: { type: Number, min: 0, max: 19 },
      ageMax: { type: Number, min: 0, max: 20 },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// MODEL
const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
