const MedInf = require("../models/medical information");
const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");

router.get("/users/history", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const info = await MedInf.find({ user: decoded.userId }).sort("-createdAt");

    const user = await User.findById(decoded.userId);

    if (!info) {
      return res.status(400).send({
        message: "No history found",
      });
    }

    res.status(200).send({ info, user });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
