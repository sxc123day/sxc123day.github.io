const Genre = require('../models/genre')
var Book = require('../models/book')

var async = require('async')

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
exports.genre_create_get = (req, res) => {
  res.send('未实现：创建类别表单的get')
}
/**
 * @description 创建类别post
 */
exports.genre_create_post = (req, res) => {
  res.send('未实现：创建类别的post')
}
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