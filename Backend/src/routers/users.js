const User = require("../models/user");
const MedInf = require("../models/medical information");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

router.post("/users/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    if (!req.body.confirmPassword) {
      return res.status(400).send({ error: "Confirm password is required." });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .send({ error: "Passwords do not match. Please try again." });
    }
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      user.tokens = user.tokens.concat({ token });
      await user.save();
      res.send({ user, token });
    } else {
      return res.status(400).send("Password is wrong!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const me = await User.findOne({ _id: decoded.userId });
    if (!me) {
      throw new Error("No user");
    }
    res.send(me);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.put("/users/update", async (req, res) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById({ _id: decoded.userId });
//     if (!user) {
//       return res.status(404).send("User not found!");
//     }
//     if (!req.body) {
//       return res.status(400).send("Please enter data to update");
//     }
//     if (req.body.name) {
//       user.name = req.body.name;
//     }

//     if (req.body.email) {
//       user.email = req.body.email;
//     }

//     if (req.body.phoneNumber) {
//       user.phoneNumber = req.body.phoneNumber;
//     }

//     if (req.body.gender) {
//       user.gender = req.body.gender;
//     }

//     if (req.body.age) {
//       user.age = req.body.age;
//     }
//     if (req.body.password) {
//       user.password = bcrypt.hashSync(req.body.password, 8);
//     }
//     if (!user.isModified()) {
//       return res.status(400).json({ message: "No information updated." });
//     }

//     await user.save();
//     res.status(200).send({ message: "User information updated:", user });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


// router.post("/users/prediction", async (req, res) => {
//   try {
//     const data = [req.body]; // Wrap the request body in a list to match the expected format

//     // Send a POST request to the Python API
//     const response = await axios.post("http://127.0.0.1:5000/predict", data);

//     // Handle the response from Python
//     const predictions = response.data.prediction;

//     // const MidInf = new MedInf(req.body);
//     // await MidInf.save();

//     console.log(predictions);
//     res.json({ prediction: predictions });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// {
//   "Age(year)": 27,
//   "Gender": 1,
//   "Height(cm)": 150,
//   "Weight(kg)": 57,
//   "BMI(kg/m^2)": 25.33,
//   "Systolic Blood Pressure(mmHg)": 121,
//   "Diastolic Blood Pressure(mmHg)": 80,
//   "BP": 50,
//   "Cholesterol": 7,
//   "Glucose": 0,
//   "smoke": 0,
//   "alco": 0,
//   "active": 1
// }

router.post("/users/prediction", async (req, res) => {
  try {
    const {
      Age,
      Gender,
      Height,
      Weight,
      HighBP,
      LowBP,
      Cholesterol,
      Glucose,
      Smoking,
      Alcohol,
      Activity,
    } = req.body;

    const BMI = Weight / ((Height / 100) * (Height / 100));

    const BP = LowBP + (1 / 3) * (HighBP - LowBP);

    // console.log(BMI);
    // console.log(BP);

    // const data = [{ BMI, BP, ...req.body }]; // Wrap the request body in a list to match the expected format

    // const data = [req.body]; // Wrap the request body in a list to match the expected format

    const data = {
      Age,
      Gender,
      Height,
      Weight,
      BMI,
      HighBP,
      LowBP,
      BP,
      Cholesterol,
      Glucose,
      Smoking,
      Alcohol,
      Activity,
    };

    // Send a POST request to the Python API
    const response = await axios.post("http://127.0.0.1:5000/predict", [data], {
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
    });

    // Handle the response from Python
    const predictions = response.data.predictions; // Update to match the response format

    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const MidInf = new MedInf({
      ...data,
      Result: predictions[0],
      user: decoded.userId,
    });

    await MidInf.save();

    // Handle the predictions as needed
    console.log({ predictions });

    // Send the predictions as the response
    res.json({ predictions });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
