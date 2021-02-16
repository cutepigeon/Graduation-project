<template>
    <div class="about">
      <el-table :data="item">
        <el-table-column prop="._id" label="ID" width="200"></el-table-column>
        <el-table-column prop="user_name" label="用户名" width="150"></el-table-column>
        <el-table-column prop="content" label="评论内容" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push(`/comment/manage/${scope.row._id}`)" size="small">管理</el-button>
            <!--scope.row为行,记得这么写router.push内用反引号-->
          </template>
      </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default{
  data() {
    return {
      item:[
      ],
    }
  },
  methods: {   
    async fetch(){
      const res=await this.$http.get('rest/comments')
      this.item=res.data
    },
    
  },
  //created在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  created() {
    this.fetch()
  },
}

</script>
