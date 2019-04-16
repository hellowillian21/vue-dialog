const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
      config.resolve.alias
        .set('@', resolve('src'))
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `@import "@/lib/hotcss/px2rem.scss";`
      }
    }
  },
}