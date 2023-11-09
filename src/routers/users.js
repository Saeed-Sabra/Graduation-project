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


router.post("/users/prediction", async (req, res) => {
  try {
    const data = [req.body]; // Wrap the request body in a list to match the expected format

    // Send a POST request to the Python API
    const response = await axios.post("http://127.0.0.1:5000/predict", data, {
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
    });

    // const response = await axios.post("http://127.0.0.1:5000/predict", data, {
    //   headers: { "Content-Type": "application/json" }, // Set the content type to JSON
    // });

    // Handle the response from Python
    const predictions = response.data.predictions; // Update to match the response format
    // const MidInf = new MedInf(req.body);
    // await MidInf.save();

    // Handle the predictions as needed
    console.log({ predictions });

    // Send the predictions as the response
    res.json({ predictions });
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post("/user/login", async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();
//     res.send({ user, token });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
