module.exports={
  outputDir:__dirname+'/../server/web',
    // outputDir:__dirname+'/../server/web' ,
    //环境变量判断，开发环境时直接用'/'
    // publicPath: process.env.NODE_ENV === 'production'
    // ? '/admin/'
    // : '/'

       // Template for index.html
    //    index: path.resolve(__dirname, '../dist/index.html'),

       // Paths
    //    assetsSubDirectory: 'static',
      publicPath: './',
}