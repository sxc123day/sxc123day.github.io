var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

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
 exports.book_list = function(req, res, next) {

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
exports.book_detail = (req, res) => {
  res.send('未实现：书籍详情：' + req.params.id)
}
/**
 * @description 创建书籍get
 */
exports.book_create_get = (req, res) => {
  res.send('未实现：创建书籍表单的get')
}
/**
 * @description 创建书籍post
 */
exports.book_create_post = (req, res) => {
  res.send('未实现：创建书籍的post')
}
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