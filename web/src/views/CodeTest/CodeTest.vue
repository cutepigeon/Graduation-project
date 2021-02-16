<template>
   <div class="code-test-page">
       <div class="main">
       <div class="code-test-title text-center ">
           <span class="text-white"><h1>在线代码测试</h1></span>
       </div>
       <div class="mt-2 p-2">
            <el-input type="textarea" :rows="6"  autofocus="true" v-model='html1'></el-input>
      </div>
      <div class="p-2" style="overflow: hidden;">
          <el-button type="primary" @click='run' style="float:right">运行</el-button>
      </div>
      <!-- <div v-html="html2">
      </div> -->
      <div  class=" p-2 bg-white result" >
          <span v-html="html2"></span>
      </div>
    </div>
   </div>
</template>
<script>
   export default{
       data() {
           return {
               html1:'',
               html2:''
           }
       },
       methods: {
           run(){
               this.html2=this.html1
           }
       },
   }
</script>
<style>
    .code-test-page{
        padding: 1.5rem 0;
    }
    .code-test-page .main{
        margin: 2%;
        padding: 2rem 0;
    }
    .code-test-page .result{
        margin: 1% 2.5% 1% 2.5%;
      height: 9.375rem;
      width: 95%
    }
</style>
