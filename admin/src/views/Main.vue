<template>
    
<el-container style="height: 100vh">
  <el-aside width="200px" style="background-color:  rgb(34, 33, 33)">
    <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path" 
    text-color="#fff"><!--加上路由跳转,默认打开，只打开一个，高亮-->
      <el-submenu index="1">
        <template slot="title" ><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item><!--index中是跳转的组件-->
          <el-menu-item index="/articles/list" >文章列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
            <template slot="title">我的文章</template>
            <el-menu-item index="/myarticles/create">新建我的文章</el-menu-item><!--index中是跳转的组件-->
            <el-menu-item index="/myarticles/list">我的文章列表</el-menu-item>
            <el-menu-item index="/indexArticles/create">新建首页文章</el-menu-item><!--index中是跳转的组件-->
            <el-menu-item index="/indexArticles/list">首页文章列表</el-menu-item>
          </el-menu-item-group>
      </el-submenu>
   
      <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>运营管理</template>
          <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item><!--index中是跳转的组件-->
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>系统设置</template>
          <el-menu-item-group>
              <template slot="title">分组</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item><!--index中是跳转的组件-->
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
          <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item><!--index中是跳转的组件-->
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item-group>
          <template slot="title">用户</template>
          <el-menu-item index="/user/edit">用户列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
            <template slot="title">评论管理</template>
            <el-menu-item index="/article/comment">评论列表</el-menu-item><!--index中是跳转的组件-->
          </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
        <el-row type="flex" class="row-bg" justify="space-between">   
            <el-col :span="4" class="header-font">后台系统管理</el-col>
            <el-col :span="1" class="header-logout"><a href="#" @click.prevent="logout" >退出</a></el-col>
      </el-row>
    </el-header>
    
    <el-main>
        <router-view :key="$route.path"></router-view>
      <!--<el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>-->
    </el-main>
  </el-container>
</el-container>

</template>

<style>
  .el-header {
    box-shadow: inset 0 0 1000px
    rgba(255, 255, 255, 0.25) ;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-main{
    background-color: #F2F6FC
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      }
    },
  };
</script>