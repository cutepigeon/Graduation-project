<template>
        <div >
            <m-topbar title="充值中心" iconfont="icon-cha" to="/person/message"></m-topbar>
            <div class="bg-white mt-2">
                <div class="border-bottom p-2" style="height: 2rem">充值</div>
            </div>
            <div class="recharge-main bg-white">
               <div class="recharge-user d-flex">
                  <span class="flex-1"> 账号</span>

               </div>
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
           
        },
        // mapMutations:{
         
        // },
        created() {
       
        },
    }
    </script>
    <style>
       
    </style>