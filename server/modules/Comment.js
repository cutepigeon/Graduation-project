const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    user_name:{type:String},
    about_article:{type:mongoose.SchemaTypes.ObjectId,ref:'MyArticle'}
})
module.exports=mongoose.model('Comment',Schema)