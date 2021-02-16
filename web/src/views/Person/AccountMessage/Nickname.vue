<template>
        <div >
            <m-topbar title="修改昵称" iconfont="icon-cha" to="/account/management/"></m-topbar>
            <div class="account-management-main mt-3">
                <el-input v-model="model.nickname"  autofocus="true" :placeholder="nickname"></el-input> 
            </div>
            <div class="mt-3 text-center">
            <el-button  type="info" round size="large" style=" background-color:  rgba(13,160,180, 0.3);border: none;" 
             @click="modify"> 修改</el-button>
        </div>
        </div>
    </template>
    <script>
    // import { mapMutations } from 'vuex'
    export default{
        data() {
            return {
                model:{},
                nickname:''
            }
        },
        methods: {
            modify(){
                this.upPersonMessage()
                this.$message({
                    message:"修改成功",
                    type:"success"
                })
            },
            test(){
                this.$store.commit('increment')
            }
        },
        // mapMutations:{
         
        // },
        created() {
            this.test()
            localStorage.id && this.fetchNickname()
        },
    }
    </script>
    <style>
       
    </style>