const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { validateUser, validateComment, validateReply, validateCommentUpdate } = require('../middlewares/validators');

// Create a user
router.post('/users', validateUser, commentController.createUser);

// Store a comment by a user
router.post('/comments', validateComment, commentController.createComment);

// Store a reply to a comment or a reply itself by a user
router.post('/comments/:id/replies', validateReply, commentController.createReply);

// Get all comments by a user
router.get('/users/:id/comments', commentController.getUserComments);

// Get all replies of a comment or a reply
router.get('/comments/:id/replies', commentController.getCommentReplies);

// Update a comment or a reply
router.put('/comments/:id', validateCommentUpdate, commentController.updateComment);

// Delete a comment or a reply
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
