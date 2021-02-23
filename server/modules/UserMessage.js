const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    nickname:{type:String},
    signature:{type:String},
    avatar:{type:String},
    vip:{type:String},
    allow:{type:Boolean}
})


module.exports=mongoose.model('UserMessage',Schema)