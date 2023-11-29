const express = require("express");
const router = express.Router();
const User = require("../models/user");
const MedInf = require("../models/medical information");

router.get("/admins/users", async (req, res) => {
  const users = await User.find({}).select("-password");
  try {
    if (!users) {
      return res.status(400).send({ error: "No Users Found!" });
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/admins/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(400).send({ error: "No User Found!" });
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
        .send({ error: "Confirm Passwords do not match. Please try again." });
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

router.delete("/admins/users/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).send({ message: "No user found!" });
    }

    res.send({ message: "user deleted success" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/admins/users/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(400).send({ message: "No user found!" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/admins/users/tests/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const medicalInfo = await MedInf.find({ user })
      .populate("user", "name")
      .sort("-createdAt");

    if (!medicalInfo) {
      return res.status(404).send({ message: "No medical information found" });
    }

    res.status(200).send(medicalInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
