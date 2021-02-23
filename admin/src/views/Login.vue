<template>
    <div class="login-container">
      <!-- <el-card header="登录" style="text-align: center">
          <el-form @submit.native.prevent="login" class="login-form">
            <el-form-item >
              <el-input type="text" v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="model.password"></el-input>
              </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">登录</el-button>
              </el-form-item>
          </el-form>

      </el-card> -->
      <form class="login-form" @submit.prevent.prevent="login">
          <h2 class="title">登录</h2>
         <input  type="text"  placeholder="用户名" v-model="model.username">
         <input type="password" placeholder="密码" v-model="model.password">
         <button class="btn" type="submit">登录</button>
      </form>
    </div>
</template>
<script>
  export default{
    data() {
      return {
        model:{}
      }
    },
    methods: {
      async login(){
          const res= await this.$http.post('login',this.model)
          localStorage.token=res.data.token//退出浏览器也还在
          this.$router.push('/')
          this.$message({
            type:'success',
            message:'登录成功'
          })
      }
    },
  }
   
</script>

<style>
  .login-container{
    height: 100vh;
        width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url(../assets/login/forest.jpg) no-repeat fixed;
      background-size: cover
  }
  .login-form{
        height: 220px;
       width: 240px;
        display: flex;
        padding: 40px;
        flex-direction: column;
        text-align: center;
        background: inherit;
        position: relative;
        border-radius: 18px;
        z-index: 100;
        overflow: hidden;
    }
    .login-form::before{
       content: "";
       width: calc(100% + 20px);
       height:calc(100% + 20px);
        background:inherit;
        box-shadow: inset 0 0 200px
        rgba(255, 255, 255, 0.25);
        position: absolute;
        top: -10px;
        left: -10px;
        z-index: -1;
        filter: blur(6px);
        overflow: hidden;
    }
    .login-form input,
    .login-form button{
        margin:7px 0;
        height: 36px;
        padding: 0 10px;
        border-radius: 5px;
        border: none;
        background-color:rgba(255, 255, 255, 0.35); 
    }
    .login-form input::placeholder{
        color: rgb(75, 74, 74)
    }
    .login-form button{
        background-color: rgba(57, 88, 69, 0.4);
        color: white;
        position: relative;
        overflow: hidden;/*超出button范围的不显示*/
        cursor: pointer;
        transition: 0.4s;
    }
    .login-form button:hover{
        background-color: rgba(57, 88, 69, 0.8);
    }
    .login-form button::before,
    .login-form button::after{
        content: "";
        display: block;
        height: 100%;
        width: 80px;
        background: rgba(56, 151, 56,0.5);
        position: absolute;
        opacity: 0.5;
        top: 0;
        left: 0;
        transform: skewX(-15deg);
        filter: blur(30px);
        transform: translateX(-100px)
        /*底下after的总长100，所以向左移动100展现连续动画效果*/
    }
    .login-form button::after{
        width: 40px;
        background-color: rgba(56, 151, 56,0.3);
        left: 60px;
        filter: blur(5px);
        opacity: 0;
    }
    .login-form button:hover::before{
       transition: 1s;
       transform:translateX(320px);
       opacity: 0.7;
    }
    .login-form button:hover::after{
       transition: 1s;
       transform:translateX(320px);
       opacity: 0.7;
    }
    .login-form h2{
        font-weight: 400;
        color:rgba(56, 151, 56,0.5);
  
    }
</style>