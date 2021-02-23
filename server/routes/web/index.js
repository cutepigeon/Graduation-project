const web = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const jwt = require('jsonwebtoken')
    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')
    const IndexArticle = mongoose.model('IndexArticle')
    const myArticle = mongoose.model('MyArticle')
    const svgCaptcha = require('svg-captcha')
    const User = mongoose.model('User')
    const UserMessage = mongoose.model('UserMessage')
    const userAuth = require('../../middleware/auth2')
    const assert = require('http-assert')
    const Collection=mongoose.model('Collection')
    //主页接口
    router.get('/main', async (req, res) => {
        const indexArticle = await IndexArticle.find()
        res.send(indexArticle)
    })
    //我的文章接口
    router.get('/articleCategories', userAuth(), async (req, res) => {
        const parent = await Category.findOne({
            name: '我的文章'
        })
        const myArticleCategories = await Category.find({
            parent: parent._id
        })
        res.send(myArticleCategories)
    })
    router.get('/catalog-title/:id', async (req, res) => {
        const title = await Category.findById(req.params.id)
        res.send(title)
    })
    router.get('/catalog/:id', async (req, res) => {
        const catalog = await myArticle.find({
            categories: req.params.id
        })
        res.send(catalog)
    })
    //我的文章主页面接口
    router.get('/myArticleMain/:id', async (req, res) => {
        const main = await myArticle.findById(req.params.id).populate('categories').lean()
        main.related = await myArticle.find({
            categories: main.categories._id
        }).limit(3)
        for (let i in main.related) {
            const id1 = main.related[i]._id.toString()
            const id2 = main._id.toString()
            if (id1 === id2) {
                main.related.splice(i, 1)
            }
        }
        res.send(main)
    })
    //新闻列表接口
    router.get('/news/list', async (req, res) => {
        //    const parent=await Category.findOne({
        //        name:"新闻分类"
        //    }).populate({
        //        path:"children",
        //        populate:{
        //            path:"newsList"
        //         }    
        //    }).lean()
        const parent = await Category.findOne({
            name: "新闻分类"
        })
        //聚合查询
        const cats = await Category.aggregate([
            //找到有parent的数据
            { $match: { parent: parent._id } },
            //从另外的模型中查找
            {
                $lookup: {
                    //聚合名默认为是模型名小写的复数，也可以自己定义
                    from: 'articles',
                    //本地键
                    localField: '_id',
                    //外键
                    foreignField: 'categories',
                    //放置
                    as: 'newsList'
                }
            },
            {
                //修改数据
                $addFields: {
                    //每个newsList数组只要5个数据
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
        const subCats = cats.map(v => v._id)//获取分类的id
        cats.unshift({
            name: '综合',
            newsList: await Article.find().where({
                categories: { $in: subCats }  //查询全部分类文档（对应上面id）
            }).populate('categories').limit(5).lean()//categories关联查询Category里的数据
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.CategoryName = (cat.name === '综合') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })
     //文章接口
    router.get('/articles/:id', async (req, res) => {
        const article = await Article.findById(req.params.id).lean()
        article.related = await Article.find().where({
            categories: { $in: article.categories }
        }).limit(2)

        res.send(article)
    })
    //英雄接口
    router.get('/heroes/:id', async (req, res) => {
        const hero = await Hero.findById(req.params.id).populate("categories").lean()
        res.send(hero)
    })
    //vip验证码接口
    router.get('/vip/captcha', async (req, res) => {
        const captcha = await svgCaptcha.create({ fontSize: 50, width: 100 });
        res.send({
            img: captcha.data,
            text: captcha.text
        });
    })
    //vip注册
    router.post('/vip/register', async (req, res) => {
        const register = await User.create(req.body)
        res.send(register)
    })
    // router.get('/vip/test', async (req, res) => {
    //     const user = await User.find()
    //     res.send(user)
    // })
   
     //用户信息查询
     router.get('/person/message/:id',async(req,res)=>{
        const model = await UserMessage.findOne({
            user:req.params.id
        })
        res.send(model)
     })
     router.get('/person/register/:id',async(req,res)=>{
        const model = await User.findById(req.params.id).select('+password')
        res.send(model)
     })
     router.get('/person/collection/control/:id',async(req,res)=>{
        const model = await Collection.findOne({
            user:req.params.id
        })
        res.send(model)
     })
     router.get('/person/collection/query/:id',async(req,res)=>{
         const model=await Collection.findOne({
             user:req.params.id
         }).populate('article_body')
         res.send(model)
     })
     
     //用户信息创建
     router.post('/person/create/:id',async(req,res)=>{
         const  modelUser={
             user:req.params.id,
             allow:true
         }
         const user=req.params.id
        const model = await UserMessage.findOne({
            user
        })
         if(!model){
        await UserMessage.create(modelUser)
         }else{
             await UserMessage.findByIdAndUpdate(model.id,req.body)
             console.log("更新成功")
         }
         console.log("已存在")
     })
     //我的收藏
     router.post('/person/collection/:id',async(req,res)=>{
        const  modelUser={
            user:req.params.id
        }
        const user=req.params.id
       let model = await Collection.findOne({
           user
       })
        if(!model){
       await  Collection.create(modelUser)
        }else{
            //当前收藏加上原本收藏
                   req.body.article_body.push(...model.article_body)
                   //去重
               const articleArr=Array.from(new Set(req.body.article_body))         
               console.log( articleArr)
               const articleModel={
                   article_body:articleArr
               }
            await  Collection.findByIdAndUpdate(model.id,req.body)
        }
        model=await Collection.findOne({
            user
        })
        if(model.article_body.length==0){
        await  Collection.findByIdAndUpdate(model.id,req.body)
        }
    })
    //取消收藏
    router.post('/person/collection/delete/:id',async(req,res)=>{
        const model=await Collection.findOne({
            user:req.params.id
        })
        console.log(model)
        for(let i of model.article_body){
            for(let j of req.body.article_body){
            if(i==j){
                model.article_body.splice(i,1)
            }
            }
        }
        await Collection.findByIdAndUpdate(model.id,model)  
    })

    app.use('/web/api', router)

    // app.post('/web/api/vip/login', async (req, res) => {
    //     const { username, password } = req.body
    //     const user = await User.findOne({ username }).select('+password')
    //     assert(user, 422, '用户不存在')
    //     const isValid = require('bcryptjs').compareSync(password, usre.password)
    //     assert(isValid, 422, '密码错误')
    //     const token = jwt.sign({ id: user._id }, app.get('secret2'))
    //     res.send({ token })
    // })
     //vip登录
    app.post('/web/api/vip/login', async (req, res) => {
        const { username, password } = req.body//解构赋值
        
        //通过用户名找用户
        const user = await User.findOne({ username }).select('+password')//模型设置了不取出password，所以这里得写select+
        assert(user, 422, '用户不存在')
        // 相当 if(!user){
        //      return res.status(422).send({
        //          message:"用户不存在"
        //      })//状态码422
        //  }
        //密码校验
        const isValid = require('bcryptjs').compareSync(password, user.password)//compareSync明文密文比较,返回值boolean
        assert(isValid, 422, '密码错误')
        //返回token
        const token = jwt.sign({ id: user._id }, app.get('secret2'))//参数是加密的字段
        let model={
            token:token,
            id:user._id
        }
        res.send(model)
    })
    //图片上传
    // const multer=require('multer')
    // const webUpload=multer({
    //     dest: __dirname + '/../../web_upload'
    // })
    // app.post('/web/api/webUpload',webUpload.single('file'),async(req,res)=>{
    //     const file=req.file
    //     console.log(file)
    //     file.url=`http://localhost:3000/web_upload/${file.filename}`
    //     res.send(file)
    // })
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads/webupload'//dirname是绝对地址,dest存储图片路径
    })
    app.post('/web/api/upload', upload.single('file'), async (req, res) => {//upload.single接收前端参数
        const file = req.file//运用中间件，将file添加到req上
        //修改url地址为域名让别人也可以访问
        file.url = `http://localhost:3000/uploads/webupload/${file.filename}`
        res.send(file)
    })

    //错误处理函数,没有的话不能返回给前端信息
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}

module.exports = web