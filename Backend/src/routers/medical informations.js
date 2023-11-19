const MedInf = require("../models/medical information");
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");

router.get("/users/history", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    console.log(decoded.userId);
    const info = await MedInf.find({ user: decoded.userId })
      .populate("user", "name")
      .sort("-createdAt");

    if (!info) {
      return res.status(400).send({
        message: "No history found",
      });
    }

    res.status(200).send(info);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
