const router = require("express").Router();
const Destination = require("../models/destination");

const express = require("express");

const fs = require("fs");
const cloudinary = require("../cloudinary");
const upload = require("../multer");

//Create posts
router.post("/destination", upload.array("image"), async (req, res) => {
  //  const photo = req.file ? req.file.path : null;
  //console.log(req.body);
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const urls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  const images = [];
  //const thumb=urls[0];
  const { url } = urls[0];
  thumb = url;
  urls.splice(0, 1);
  for (const data of urls) {
    const { url } = data;
    images.push(url);
  }
  const newPost = new Destination({
    title: req.body.title,
    city: req.body.city,
    state: req.body.state,
    description: req.body.description,
    author: req.body.author,
    userthumbnail: thumb,
    username: req.body.username,
    images: images,
  });
  try {
    const data = await newPost.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get posts on user profile
router.get("/destination/getposts", async (req, res) => {
  const id = req.query.id;
  const posts = await Destination.aggregate([{ $match: { author: id } }]);
  console.log(posts);
  res.status(200).json(posts);
});

//getting places data
router.get("/destination/getplaces", async (req, res) => {
  try {
    const places = await Destination.find();
    res.status(201).json(places);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/filterdata", async (req, res) => {
  console.log(req.query);
  const placequery = req.query.place;
  const locationquery = req.query.location;
  const userquery = req.query.user;
  // console.log(placequery);
  // console.log(locationquery);
  // console.log(userquery);

  try {
    const post1 = await Destination.aggregate([
      { $match: { username: userquery } },
    ]);
    const post2 = await Destination.aggregate([
      { $match: { title: placequery } },
    ]);
    const post3 = await Destination.aggregate([
      { $match: { city: locationquery } },
    ]);
    let combinedArray = [...post1, ...post2, ...post3];
    res.status(200).json(combinedArray);
    // let list = [];
    // try {
    //   //--------------------------------------------------------------//
    //   if (placequery) {
    //     if (locationquery && userquery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         {
    //           $match: {
    //             username: userquery,
    //             city: locationquery,
    //             title: placequery,
    //           },
    //         },
    //       ]);
    //     } else if (locationquery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { city: locationquery, title: placequery } },
    //       ]);
    //     } else if (userquery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { username: userquery, title: placequery } },
    //       ]);
    //     } else {
    //       list = await User.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { title: placequery } },
    //       ]);
    //     }
    //   }

    //   //------------------------------------------------//
    //   else if (locationquery) {
    //     if (placequery && userquery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         {
    //           $match: {
    //             username: userquery,
    //             city: locationquery,
    //             title: placequery,
    //           },
    //         },
    //       ]);
    //     } else if (placequery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { city: locationquery, title: placequery } },
    //       ]);
    //     } else if (userquery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { username: userquery, city: locationquery } },
    //       ]);
    //     } else {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { city: locationquery } },
    //       ]);
    //     }
    //   }

    //   //------------------------------------------------//
    //   else if (userquery) {
    //     if (placequery && locationquery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         {
    //           $match: {
    //             username: userquery,
    //             city: locationquery,
    //             title: placequery,
    //           },
    //         },
    //       ]);
    //     } else if (placequery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { username: userquery, title: placequery } },
    //       ]);
    //     } else if (locationquery) {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { username: userquery, city: locationquery } },
    //       ]);
    //     } else {
    //       list = await Destination.aggregate([
    //         { $sample: { size: 10 } },
    //         { $match: { username: userquery } },
    //       ]);
    //     }
    //   } else {
    //     list = await Destination.aggregate([{ $sample: { size: 10 } }]);
    //   }
    // res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
