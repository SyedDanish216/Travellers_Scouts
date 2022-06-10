const router = require("express").Router();
const User = require("../models/User");
const cloudinary = require("../cloudinary");
const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const upload = require("../multer");
const { json } = require("express");

//Register
router.post("/register", upload.single("photo"), async (req, res) => {
  const photo = req.file ? req.file.path : null;
  const result = await cloudinary.uploads(photo, "Images");

  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    profilePic: result.url,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    userdescription: req.body.description,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const em = await User.findOne({ email: req.body.email });

    if (em) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json("Invalid ceredntials or user already exists");
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(403).json("No user found with this email!");
    } else {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        res.status(403).json("Wrong password or username");
      } else {
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "90d" }
        );

        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get users
router.get("/getusers", async (req, res) => {
  try {
    const user = await User.find().sort({ ratings: -1 });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//updating user ratings
router.put("/users/updateuser", async (req, res) => {
  const id = req.query.id;
  const value = req.query.rate;
  const data = await User.findOne({ _id: id });

  let updatedata;
  if (data.ratings === 0) {
    updatedata = value;
  } else {
    updatedata = (data.ratings * 1 + value * 1) / 2;
  }
  User.findByIdAndUpdate(id, { ratings: updatedata }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
