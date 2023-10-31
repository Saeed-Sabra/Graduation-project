const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/admins/users", async (req, res) => {
  const users = await User.find({}).select("-password");
  try {
    if (!users) {
      return res.status(400).send("No Users Found!");
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/admins/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(400).send("No user found!");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/admins/users/signup", async (req, res) => {
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

router.get("/admins/users/get/count", async (req, res) => {
  const usersCount = await User.countDocuments();

  if (!usersCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    usersCount,
    success: true,
  });
});

module.exports = router;
