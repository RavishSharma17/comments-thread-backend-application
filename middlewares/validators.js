const { body } = require('express-validator');

exports.validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other')
];

exports.validateComment = [
  body('text').notEmpty().withMessage('Text is required'),
  body('authorId').notEmpty().withMessage('Author ID is required')
];

exports.validateReply = [
  body('text').notEmpty().withMessage('Text is required'),
  body('authorId').notEmpty().withMessage('Author ID is required')
];

exports.validateCommentUpdate = [
  body('text').notEmpty().withMessage('Text is required')
];
