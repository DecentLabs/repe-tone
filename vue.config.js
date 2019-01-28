module.exports = {
  chainWebpack: config => {
    config.module
    .rule('url')
    .test(/\.mp3|\.ogg$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 10000,
      name: 'samples/[name].[ext]'
    })
  }
}