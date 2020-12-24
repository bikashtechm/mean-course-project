const express = require('express');
const app = require('../app');
const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
      res.status(201).json({
      message: 'Post added sucessfully',
      postId: createdPost._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({
      message: 'Record Updated Sucessfully...'
    })
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post Not Found...'
      });
    }
  });
});

router.get('', (req, res, next) => {
  Post.find().then(documents => {
     return res.status(200).json({
      message: 'Post fetched successfully',
      posts: documents
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({
    _id : req.params.id
  }).then(result => {
      res.status(200).json({
        message: 'Post Deleted Sucessfully...'
      });
    });
});

module.exports = router;
