module.exports={
    outputDir:__dirname+'/../server/admin' ,
    //环境变量判断，开发环境时直接用'/'
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}