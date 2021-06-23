const Genre = require('../models/genre')
var Book = require('../models/book')

var async = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/**
 * @description 类别列表
 */
exports.genre_list = (req, res, next) => {
  Genre.find({}, 'name')
    .sort([['name', 'ascending']])
    .exec((err, list_genre) => {
      if (err) { next(err) }
      // Successful, so render
      res.render('genre_list', { title: '藏书类目列表', genre_list: list_genre })
    })
}
/**
 * @description 类别详情
 */
exports.genre_detail = function (req, res, next) {

  async.parallel({
    genre: function (callback) {
      Genre.findById(req.params.id)
        .exec(callback);
    },

    genre_books: function (callback) {
      Book.find({ 'genre': req.params.id })
        .exec(callback);
    },

  }, function (err, results) {
    if (err) { return next(err); }
    if (results.genre == null) { // No results.
      var err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render
    res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
  });

};
/**
 * @description 创建类别get
 */
exports.genre_create_get = function (req, res, next) {
  res.render('genre_form', { title: 'Create Genre' });
};
/**
 * @description 创建类别post
 */
exports.genre_create_post = [

  // Validate that the name field is not empty.
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  sanitizeBody('name').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    var genre = new Genre(
      { name: req.body.name }
    );


    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() });
      return;
    }
    else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ 'name': req.body.name })
        .exec(function (err, found_genre) {
          if (err) { return next(err); }

          if (found_genre) {
            // Genre exists, redirect to its detail page.
            res.redirect(found_genre.url);
          }
          else {

            genre.save(function (err) {
              if (err) { return next(err); }
              // Genre saved. Redirect to genre detail page.
              res.redirect(genre.url);
            });

          }

        });
    }
  }
];
/**
 * @description 删除类别get
 */
exports.genre_delete_get = (req, res) => {
  res.send('未实现：删除类别表单的get')
}
/**
 * @description 删除类别post
 */
exports.genre_delete_post = (req, res) => {
  res.send('未实现：删除类别的post')
}
/**
 * @description 更新类别get
 */
exports.genre_update_get = (req, res) => {
  res.send('未实现：更新类别表单的get')
}
/**
 * @description 更新类别post
 */
exports.genre_update_post = (req, res) => {
  res.send('未实现：更新类别的post')
}