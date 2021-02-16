const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    article_body:[{type:mongoose.SchemaTypes.ObjectId,ref:'MyArticle'}],
})

module.exports=mongoose.model('Collection',Schema)