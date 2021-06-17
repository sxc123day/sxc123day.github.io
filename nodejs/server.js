const express = require('express')
const path = require('path')
const app = express()
// DASD
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 日志记录
const logger = require('morgan');
// 中间件
const test = require('./src/middleware/test').test
// wiki模块路由
const wiki = require('./src/router/wiki.js');
// router
const indexRoutes = require('./src/router/index.js');

// 托管public文件夹
app.use(express.static('public'));
app.use('/ico', express.static('public/image/ico'));

app.use(logger('dev'));
app.use('/wiki', wiki);
app.use('/', indexRoutes);
// 私有中间件
app.use('/', test)

// jade(pug) views 模板引擎引入
app.set('views', path.join(__dirname, 'src/views/pug'))
app.set('view engine', 'pug')

app.listen('8080', () => {
  console.log('示例应用正在监听 3000 端口!http://localhost:8080/')
})