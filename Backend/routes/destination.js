const router = require("express").Router();
const Destination = require("../models/destination");
const Comment = require("../models/comment")
const User = require("../models/user")

const mapBoxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapboxToken = process.env.MAPBOX_TOKEN
const geocoder = mapBoxGeocoding({accessToken: mapboxToken})

const fs = require("fs");
const cloudinary = require("../cloudinary");
const upload = require("../multer");

//Create posts
router.post("/destination", upload.array("image"), async (req, res) => {
  //  const photo = req.file ? req.file.path : null;
  console.log(req.body);
  const uploader = (path) => cloudinary.uploads(path, "Images");
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
  const thumb = url;
  urls.splice(0, 1);
  for (const data of urls) {
    const { url } = data;
    images.push(url);
  }

  const geoData = await geocoder.forwardGeocode({
    query: req.body.title,
    limit: 1
  }).send()


  const newPost = new Destination({

    geometry: geoData.body.features[0].geometry,

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

  console.log(newPost)

  const user = await User.findById(req.body.userid);
  // console.log(user)
  user.posts.push(newPost);
  user.save();

});

//get posts on user profile
router.get("/destination/getposts", async (req, res) => {
  // console.log(req.query)
  const user = await User.findById(req.query.id).populate('posts');
  const posts = user.posts;
  // console.log(posts);
  res.status(200).json({posts: posts});
});

router.post("/destination/getcomments", async(req, res)=>{
  // console.log(req.body)
  const destination = await Destination.findById(req.body.dest_id).populate({
      path: 'comments',
      populate: {
        path: 'author'
      }
  });
  // console.log(destination)
  const comments = destination.comments;
  res.status(200).json({comments: comments})
})

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
  const placequery = req.query.place;
  const locationquery = req.query.location;
  const userquery = req.query.user;
  // console.log(placequery);
  // console.log(locationquery);
  // console.log(userquery);
  let list = [];
  try {
    //--------------------------------------------------------------//
    if (placequery) {
      if (locationquery && userquery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          {
            $match: {
              username: userquery,
              city: locationquery,
              title: placequery,
            },
          },
        ]);
      } else if (locationquery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          { $match: { city: locationquery, title: placequery } },
        ]);
      } else if (userquery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          { $match: { username: userquery, title: placequery } },
        ]);
      } else {
        list = await User.aggregate([
          { $sample: { size: 10 } },
          { $match: { title: placequery } },
        ]);
      }
    }

    //------------------------------------------------//
    else if (locationquery) {
      if (placequery && userquery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          {
            $match: {
              username: userquery,
              city: locationquery,
              title: placequery,
            },
          },
        ]);
      } else if (placequery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          { $match: { city: locationquery, title: placequery } },
        ]);
      } else if (userquery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          { $match: { username: userquery, city: locationquery } },
        ]);
      } else {
        list = await User.aggregate([
          { $sample: { size: 10 } },
          { $match: { city: locationquery } },
        ]);
      }
    }

    //------------------------------------------------//
    else if (userquery) {
      if (placequery && locationquery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          {
            $match: {
              username: userquery,
              city: locationquery,
              title: placequery,
            },
          },
        ]);
      } else if (placequery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          { $match: { username: userquery, title: placequery } },
        ]);
      } else if (locationquery) {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          { $match: { username: userquery, city: locationquery } },
        ]);
      } else {
        list = await Destination.aggregate([
          { $sample: { size: 10 } },
          { $match: { username: userquery } },
        ]);
      }
    } else {
      list = await Destination.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


router.post('/createcomment', async(req, res)=>{

  const destination = await Destination.findById(req.body.id).populate('author')
  // console.log(destination)
  
  const commentAuthor = await User.findById(req.body.author)


  const comment = new Comment({
    comment: req.body.commentBody,
    author: commentAuthor,
    rating: req.body.rating
  })

  await comment.save()

  destination.comments.push(comment)

  const len = destination.comments.length;
  let dest_avgRating = destination.avgRating;
  if(dest_avgRating==-1){
    dest_avgRating = 0;
  }
  const avgRating = (dest_avgRating * (len-1) + req.body.rating)/len;

  destination.avgRating = avgRating.toFixed(1);

  await destination.save()
  
  // TRYING TO UPDATE DESTINATION AUTHOR(destination JISME COMMENT KIYA GAYA  HAI, uska author) BUT NOT WORKING

  // const destAuthor = await User.findOne({username: destination.username}).populate('posts')
  // let destAuthorRating = 0
  // for(const post in destAuthor.posts){
  //   destAuthorRating += Number(post.avgRating)
  // }
  // let AuthorRating = destAuthorRating/destAuthor.posts.length
  // AuthorRating = Number(AuthorRating.toFixed())
  // destAuthor.rating = AuthorRating
  // await destAuthor.save()

  res.status(200).send(comment)

});


// DELETE COMMENT - NEEDS TO BE CORRECTED A LITTLE BIT - AND WE NEED TO ADD BUTTONS TO DELETE AND UPDATE POSTS AND COMMENTS

// router.post('/deleteComment/:commentId', async(req, res)=>{

//   const {destinationId} = req.body
//   const commentId = req.params.commentId

//   // const { destinationId, CommentId } = req.body
//   const user = await User.findById(req.body.author._id);
//   const destination = await Destination.findByIdAndUpdate(destinationId, { $pull: { comments: commentId } }, { new: true }).populate('comments', 'rating');
//   let avgRating = 0;

//   destination.comments.forEach(rev => (avgRating += rev.rating))

//   avgRating = (avgRating / destination.comments.length);
//   avgRating = avgRating.toFixed(1);

//   destination.avgRating = avgRating;
//   user.rating = avgRating

//   await destination.save();
//   await user.save()
//   const deletedComment = await Comment.findByIdAndDelete(commentId)

//   res.status(StatusCodes.OK).json({ msg: 'Comment deleted', deletedComment, updatedDestination: destination })
//   //updated destination is destination after deletion of Comment
// })


module.exports = router;
