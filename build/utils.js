const path = require('path')

// 获取静态资源路径
exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production' ? 'static' : 'static'

  return path.posix.join(assetsSubDirectory, _path)
}
