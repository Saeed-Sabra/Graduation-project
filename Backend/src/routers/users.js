const User = require("../models/user");
const MedInf = require("../models/medical information");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const sendEmail = require("../emails/sendEmail");

router.post("/users/signup", async (req, res) => {
  const user = new User(req.body);
  const email = req.body.email;
  try {
    if (await User.findOne({ email: email })) {
      return res.status(400).send(`Email is already used!`);
    }
    if (!req.body.confirmPassword) {
      return res.status(400).send({ error: "Confirm password is required." });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .send({ error: "Passwords do not match. Please try again." });
    }
    await user.save();
    const token = jwt.sign({ email }, process.env.EMAILTOKEN, {
      expiresIn: "1h",
    });
    const link = `${req.protocol}://${req.headers.host}/users/confirmEmail/${token}`;
    // link=`http://localhost:3001/users/confirmEmail/${token}`

    sendEmail(email, "confirm email", link, user.name);

    res.status(201).send({ user, successful: true });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/confirmEmail/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.EMAILTOKEN);
    const user = await User.findOneAndUpdate(
      { email: decoded.email, confirmEmail: false },
      { confirmEmail: true }
    );

    if (!user) {
      return res.status(400).json({ message: "your email is not verified" });
    }
    if (user) {
      return res.status(200).json({ message: "your email is verified" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    if (!user.confirmEmail) {
      return res.status(400).json({ message: "plz confirm your eamil " });
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
      res.send({ user, token, successful: true });
    } else {
      return res.status(400).send({ error: "Password is wrong!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const me = await User.findOne({ _id: decoded.userId });
    if (!me) {
      return res.status(400).send({ error: "No User!" });
    }
    res.send(me);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
