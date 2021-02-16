<template>
    <div class="small-function-page">
        <topbar-menu></topbar-menu>
     
        <div class="function-main d-flex mt-3 p-2">
           <div class="function-main-item">
               <router-link class="function-btn " tag="button" to='/'>在线代码测试</router-link>
           </div>
        </div>
        <router-view/>
    </div>
</template>
<style>
    .function-main{

        height: 9rem;
        margin: 0 2% 0 2%;
         background-color: rgba(230, 238, 232, 0.7);
         box-shadow: 0px 0px 0.4rem black;
        border-radius: 0.6rem
    }
    .function-btn{
        background-color: paleturquoise;
        border-radius: 10px;
    }
    .small-function-page{
    margin: 0;
    background-image: url(../../assets/indexImage/index-snow.png);
    background-size: cover
  }
</style>
