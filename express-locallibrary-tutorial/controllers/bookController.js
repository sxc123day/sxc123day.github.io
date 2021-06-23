var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/**
 * @description 欢迎首页
 */
exports.index = (req, res) => {
  async.parallel({
    book_count: function (callback) {
      Book.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
    },
    book_instance_count: function (callback) {
      BookInstance.count({}, callback);
    },
    book_instance_available_count: function (callback) {
      BookInstance.count({ status: 'Available' }, callback);
    },
    author_count: function (callback) {
      Author.count({}, callback);
    },
    genre_count: function (callback) {
      Genre.count({}, callback);
    },
  }, function (err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results });
  });
};
/**
 * @description 书籍列表
 */
exports.book_list = function (req, res, next) {

  Book.find({}, 'title author')
    .populate('author')
    .exec(function (err, list_books) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('book_list', { title: 'Book List', book_list: list_books });
    });

};
/**
 * @description 书籍详情
 */
exports.book_detail = function (req, res, next) {

  async.parallel({
    book: function (callback) {

      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback);
    },
    book_instance: function (callback) {

      BookInstance.find({ 'book': req.params.id })
        .exec(callback);
    },
  }, function (err, results) {
    if (err) { return next(err); }
    if (results.book == null) { // No results.
      var err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render('book_detail', { title: 'Title', book: results.book, book_instances: results.book_instance });
  });

};
/**
 * @description 创建书籍get
 */
exports.book_create_get = function (req, res, next) {

  // Get all authors and genres, which we can use for adding to our book.
  async.parallel({
    authors: function (callback) {
      Author.find(callback);
    },
    genres: function (callback) {
      Genre.find(callback);
    },
  }, function (err, results) {
    if (err) { return next(err); }
    res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
  });

};
/**
 * @description 创建书籍post
 */
exports.book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined')
        req.body.genre = [];
      else
        req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  // Validate fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

  // Sanitize fields (using wildcard).
  sanitizeBody('*').trim().escape(),
  sanitizeBody('genre.*').escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    var book = new Book(
      {
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre
      });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel({
        authors: function (callback) {
          Author.find(callback);
        },
        genres: function (callback) {
          Genre.find(callback);
        },
      }, function (err, results) {
        if (err) { return next(err); }

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked = 'true';
          }
        }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
      });
      return;
    }
    else {
      // Data from form is valid. Save book.
      book.save(function (err) {
        if (err) { return next(err); }
        //successful - redirect to new book record.
        res.redirect(book.url);
      });
    }
  }
];
/**
 * @description 删除书籍get
 */
exports.book_delete_get = (req, res) => {
  res.send('未实现：删除书籍表单的get')
}
/**
 * @description 删除书籍post
 */
exports.book_delete_post = (req, res) => {
  res.send('未实现：删除书籍的post')
}
/**
 * @description 更新书籍get
 */
exports.book_update_get = (req, res) => {
  res.send('未实现：更新书籍表单的get')
}
/**
 * @description 更新书籍post
 */
exports.book_update_post = (req, res) => {
  res.send('未实现：更新书籍的post')
}