<template>
    <div>
            <el-container style="background-color: white">
                    <el-header class="user-header">用户表格</el-header>
                    <el-main style="background-color: white">
                        <el-table :data="userdata">
                          <el-table-column label="用户id" prop="user" width="200px"></el-table-column>
                          <el-table-column label="用户昵称" prop="nickname"></el-table-column>
                          <el-table-column
                          prop="vip"
                          label="vip"
                          width="100"
                          :filters="[{ text: 'yes', value: 'yes' }, { text: 'no', value: 'no' }]"
                          :filter-method="filterTag"
                          filter-placement="bottom-end">
                          <template slot-scope="scope">
                            <el-tag
                              :type="scope.row.vip === 'yes' ? 'primary' : 'success'"
                              disable-transitions>{{scope.row.vip}}</el-tag>
                          </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                  <el-button type="text" @click="change(scope.row)" size="small">管理</el-button>
    
                                </template>
                              </el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer>Footer</el-footer>
             </el-container>
    </div>
</template>
<style>
    .user-header{
        border-bottom: 1px solid rgb(240, 235, 235)
    }
</style>
<script>
    export default{
        data(){
            return{
                userdata:[]
            }
        },
        methods: {
            async fetch(){
                const res = await this.$http.get('rest/user_messages')
                this.userdata = res.data
                console.log(this.userdata)
            },
            async change(val){
                val.allow = false
                await this.$http.put(`rest/user_messages/${val._id}`,val)
                this.$message({
                    type:"success",
                    message:'账号成功封禁'
                })
                console.log(val)
            },
            filterTag(value, row) {
            return row.vip === value;
          },
        },
        created() {
            this.fetch()
        },
    }
</script>