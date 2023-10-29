const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/user/signup", async (req, res) => {
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
    res.send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
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
