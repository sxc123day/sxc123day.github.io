const Author = require('../models/author')
var async = require('async');
var Book = require('../models/book');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/**
 * @description 作者列表
 */
exports.author_list = (req, res) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });
}
/**
 * @description 作者详情
 */
exports.author_detail = function (req, res, next) {

  async.parallel({
    author: function (callback) {
      Author.findById(req.params.id)
        .exec(callback)
    },
    authors_books: function (callback) {
      Book.find({ 'author': req.params.id }, 'title summary')
        .exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err); } // Error in API usage.
    if (results.author == null) { // No results.
      var err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
  });

};
/**
 * @description 创建作者get
 */
exports.author_create_get = function (req, res, next) {
  res.render('author_form', { title: 'Create Author' });
};
/**
 * @description 创建作者post
 */
exports.author_create_post = [

  // Validate fields.
  body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data from form is valid.

      // Create an Author object with escaped and trimmed data.
      var author = new Author(
        {
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death
        });
      author.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.redirect(author.url);
      });
    }
  }
];
/**
 * @description 删除作者get
 */
exports.author_delete_get = (req, res) => {
  res.send('未实现：删除作者表单的get')
}
/**
 * @description 删除作者post
 */
exports.author_delete_post = (req, res) => {
  res.send('未实现：删除作者的post')
}
/**
 * @description 更新作者get
 */
exports.author_update_get = (req, res) => {
  res.send('未实现：更新作者表单的get')
}
/**
 * @description 更新作者post
 */
exports.author_update_post = (req, res) => {
  res.send('未实现：更新作者的post')
}