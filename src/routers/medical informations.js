const MedInf = require("../models/medical information");
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");

router.post("/users/info/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const info = new MedInf({ ...req.body, user: id });
    await info.save();
    res.send(info);
  } catch (error) {
    res.status(400).send(e);
  }
});


module.exports = router;

// router.get("/users/history", async (req, res) => {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id: decoded.userId });
//     try {
//       await user
//         .populate({
//           path: "medical informations",
//           match,
//         })
//         .execPopulate();
//       res.send(user);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });
