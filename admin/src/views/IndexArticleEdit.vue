<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}首页文章</h1>
    <!--有id显示编辑，没有显示新建 -->
    <el-form @submit.native.prevent="save">
      <!--表单 -->
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文本">
        <el-input  v-model="model.article"></el-input>
      </el-form-item>
      <el-form-item label="跳转页面">
          <el-input  v-model="model.enterPage"></el-input>
        </el-form-item>
      <el-form-item label="背景图">
          <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
      >
        <img v-if="model.banners" :src="model.banners" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
      }
    },
    methods: {
      async save() {
        //  let res
        if (this.id) {
          await this.$http.put(`rest/indexArticles/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/indexArticles', this.model)
        }
        this.$router.push('/indexArticles/list')
        this.$message({
          type: "success",
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/indexArticles/${this.id}`)//get到一个对象
        this.model = res.data
      },
       //上传图片
    afterUpload(res){
       this.$set(this.model,'banners',res.url) 
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
      }
    },
    created() {
      this.id && this.fetch()  //前面条件满足后执行后面语句
    }

  }

</script>