const BookInstance = require('../models/bookinstance')

/**
 * @description 书籍副本列表
 */
exports.bookinstance_list = (req, res)=>{
  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });
}
/**
 * @description 书籍副本详情
 */
exports.bookinstance_detail = (req, res)=>{
  res.send('未实现：书籍副本详情：'+ req.params.id)
}
/**
 * @description 创建书籍副本get
 */
exports.bookinstance_create_get = (req, res)=>{
  res.send('未实现：创建书籍副本表单的get')
}
/**
 * @description 创建书籍副本post
 */
exports.bookinstance_create_post = (req, res)=>{
  res.send('未实现：创建书籍副本的post')
}
/**
 * @description 删除书籍副本get
 */
exports.bookinstance_delete_get = (req, res)=>{
  res.send('未实现：删除书籍副本表单的get')
}
/**
 * @description 删除书籍副本post
 */
exports.bookinstance_delete_post = (req, res)=>{
  res.send('未实现：删除书籍副本的post')
}
/**
 * @description 更新书籍副本get
 */
exports.bookinstance_update_get = (req, res)=>{
  res.send('未实现：更新书籍副本表单的get')
}
/**
 * @description 更新书籍副本post
 */
exports.bookinstance_update_post = (req, res)=>{
  res.send('未实现：更新书籍副本的post')
}