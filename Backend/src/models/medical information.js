const mongoose = require("mongoose");

const MedSchema = new mongoose.Schema(
  {
    Age: {
      type: Number,
      required: true,
    },
    Gender: {
      type: Number,
      required: true,
    },
    Height: {
      type: Number,
      required: true,
    },
    Weight: {
      type: Number,
      required: true,
    },
    BMI: {
      type: Number,
      required: true,
    },
    HighBP: {
      type: Number,
      required: true,
    },
    LowBP: {
      type: Number,
      required: true,
    },
    BP: {
      type: Number,
      required: true,
    },
    Cholesterol: {
      type: Number,
      required: true,
    },
    Glucose: {
      type: Number,
      required: true,
    },
    Smoking: {
      type: Number,
      required: true,
    },
    Alcohol: {
      type: Number,
      required: true,
    },
    Activity: {
      type: Number,
      required: true,
    },
    Result: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MedSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

MedSchema.set("toJSON", {
  virtual: true,
});

const MedInf = mongoose.model("MedInf", MedSchema);

module.exports = MedInf;
