const express = require("express");

const posts = express.Router();

const Post = require("../models/post");

posts.post("/", async (req, res) => {
  try {
    console.log(req.body);
    //create a new post and save it
    const post = new Post(req.body);
    await post.save();
    res.send(post);
  } catch (err) {
    res.send({ msg: err });
  }
});

posts.get("/", async (req, res) => {
  try {
    const postCollection = await Post.find();
    res.send(postCollection);
  } catch (err) {
    res.send({ msg: err });
  }
});

posts.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.send(post);
  } catch (err) {
    res.send({ msg: err });
  }
});
posts.patch("/:postId", async (req, res) => {
  try {
    const post = await Post.update(
      { _id: req.params.postId },
      { $set: { name: req.body.name, description: req.body.description } }
    );
    res.send(post);
  } catch (err) {
    res.send({ msg: err });
  }
});
posts.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.postId });
    res.send(post);
  } catch (err) {
    res.send({ msg: err });
  }
});
module.exports = posts;
