const a_middleware_function = (req, res, next) => {
  console.info('进入了私有中间件')
  // ... 进行一些操作
  next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
};

exports.test = a_middleware_function;