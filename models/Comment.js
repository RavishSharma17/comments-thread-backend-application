const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
