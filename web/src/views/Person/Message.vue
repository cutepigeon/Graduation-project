<template>
  <div class="person-page">
    <topbar-menu>
      <div class="flex-1">
        <router-link to="/" tag="div">
        </router-link>
      </div>
    </topbar-menu>
    <div class="upload">
      <el-upload :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="afterUpload">
        <img v-if="model.avatar" :src="model.avatar" class="avatar">
        <img v-else-if="exist()" :src="avatar" alt="" class="avatar">
        <i v-else class="iconfont icon-tubiaozhizuomoban " style="font-size: 10rem"></i>
      </el-upload>
    </div>
    <div  class="text-center fs-xl " v-if="(nickname)!=''" >{{nickname}} </div>
    <div v-else class="text-center fs-xl ">
      游客
    </div>
    <div  class="text-center fs-sm mt-3" v-if="(signature)!=''" >{{signature}} </div>
    <router-link tag="div" to="/signature" v-else class="text-center fs-sm mt-3">
      <i class="iconfont icon-bianji"></i>
    </router-link>>
    <div class="d-flex p-2 account-management">
      <router-link to="/account/management" class="m-1 account-management-item" tag="div">
        <span>
          <strong>账号管理</strong>
        </span>
      </router-link>
      <router-link to="/account/recharge" class="m-1 account-management-item" tag="div">
        <span>
          <strong>VIP充值</strong>
        </span>
      </router-link>
      <!-- <div class="m-1 account-management-item">
        <span>
          <strong>账号安全</strong>
        </span>
      </div> -->
    </div>
    <div class="message p-2 pr-3">
      <div class="ml-1 message-item d-flex">
          <router-link to="/account/collection" class="m-1  flex-1" tag="div">
        <span >
          <strong>我的收藏</strong>
        </span>
        </router-link>
        <span class="fs-xl">&gt;</span>
      </div>
    </div>
  </div>
</template>

<style>
  .person-page {
    padding: 0;
    margin: 0;
    background-image: url(../../assets/indexImage/index-snow.png);
    background-size: cover
  }
</style>
<script>
  export default {
    data() {
      return {
        model: {},
        avatar:'',
        nickname:'',
        signature:''
      };
    },
    methods: {
      exist(){
        if(this.avatar==''||!('avatar' in this.model)){
          return false
        }else{
          return true
        }
      },
      //上传图片
      async afterUpload(res) {
        this.$set(this.model, 'avatar', res.url)
        this.upPersonMessage()
        //  this.model.icon=res.url   一致，但这么赋值有时候会赋值不上     
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      
    },
    created() {
     localStorage.id && this.fetchAvatar() &&this.fetchNickname() && this.fetchSignature()
    },
  }
</script>