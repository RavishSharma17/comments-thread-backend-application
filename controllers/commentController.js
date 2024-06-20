const { validationResult } = require('express-validator');
const User = require('../models/User');
const Comment = require('../models/Comment');

// This api is not in the requirements, but is needed to test end to end flow
exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, gender } = req.body;
    const user = new User({ name, email, gender });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, authorId } = req.body;
    const comment = new Comment({ text, author: authorId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

exports.createReply = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, authorId } = req.body;
    const { id } = req.params;
    const reply = new Comment({ text, author: authorId });
    await reply.save();
    await Comment.findByIdAndUpdate(id, { $push: { replies: reply._id } });
    res.status(201).json(reply);
  } catch (error) {
    next(error);
  }
};

exports.getUserComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ author: id }).populate('author');
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.getCommentReplies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate({
      path: 'replies',
      populate: { path: 'author' }
    });
    res.status(200).json(comment.replies);
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
