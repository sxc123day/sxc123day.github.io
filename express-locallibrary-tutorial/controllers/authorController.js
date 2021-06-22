const Author = require('../models/author')

/**
 * @description 作者列表
 */
exports.author_list = (req, res)=>{
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
exports.author_detail = (req, res)=>{
  res.send('未实现：作者详情：'+ req.params.id)
}
/**
 * @description 创建作者get
 */
exports.author_create_get = (req, res)=>{
  res.send('未实现：创建作者表单的get')
}
/**
 * @description 创建作者post
 */
exports.author_create_post = (req, res)=>{
  res.send('未实现：创建作者的post')
}
/**
 * @description 删除作者get
 */
exports.author_delete_get = (req, res)=>{
  res.send('未实现：删除作者表单的get')
}
/**
 * @description 删除作者post
 */
exports.author_delete_post = (req, res)=>{
  res.send('未实现：删除作者的post')
}
/**
 * @description 更新作者get
 */
exports.author_update_get = (req, res)=>{
  res.send('未实现：更新作者表单的get')
}
/**
 * @description 更新作者post
 */
exports.author_update_post = (req, res)=>{
  res.send('未实现：更新作者的post')
}