const mongoose = require("mongoose");

const MedSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
    },
    age: {
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
    lowBP: {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

//------------------save object in array-----------------------
// const obj = req.body;
// const arr = Object.entries(obj).map(([key, value]) => ({ key, value }));
// console.log(arr); // [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]
//----------------------------------
// const arr = Object.keys(obj).map((key) => obj[key]);
// console.log(arr); // [1, 2, 3]
