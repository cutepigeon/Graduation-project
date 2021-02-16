<template>
    <div >
        <m-topbar title="个性签名" iconfont="icon-cha" to="/account/management/"></m-topbar>
        <div class="account-management-main mt-3">
            <el-input type="textarea" :rows="6" v-model="model.signature"  autofocus="true" :placeholder="signature"></el-input>
        </div>
        <div class="mt-3 text-center">
        <el-button  type="info" round size="large" style=" background-color:  rgba(13,160,180, 0.3);border: none;" 
         @click="modify"> 确定</el-button>
    </div>
    </div>
</template>
<script>
export default{
    data() {
        return {
            model:{},
            signature:''
        }
    },
    methods: {
        modify(){
            localStorage.id && this.upPersonMessage()
            localStorage.id&& this.$message({
                message:"编辑成功",
                type:"success"
            })
        }
    },
    created() {
        localStorage.id && this.fetchSignature()
    },
}
</script>
<style>
   
</style>