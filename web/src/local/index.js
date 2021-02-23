import {Validator} from 'vee-validate'
const dictionary ={
  
    'zh_CN':{
        attributes:{
            email:'邮箱',
            password:'密码',
            username:'用户名'
        },
        messages:{
            required:field => '请输入'+ field,
         },
    }
}
Validator.localize(dictionary)
