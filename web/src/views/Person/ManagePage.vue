<template>
        <div >
            <m-topbar title="账号管理" iconfont="icon-fanhui" to="/person/message"></m-topbar>
            <div class="account-management-main mt-3">
                <div class="p-2 text-grey border-bottom">
                    账号信息
                </div>
                <router-link tag="div" to='/nickname' class="account-management-main-item p-3 d-flex border-bottom">
                   <span>昵称</span>
                   <div  v-if="nickname!=''" class="flex-1 ml-2">{{nickname}}</div>
                   <div v-else class="flex-1 ml-2 text-grey">修改昵称</div>
                   <span class="fs-xl">&gt;</span>
                </router-link>
                <router-link tag="div" to='/signature' class="account-management-main-item p-3 d-flex border-bottom">
                        <span>个性签名</span>
                        <div  v-if="signature!=''" class="flex-1 ml-2">{{signature}}</div>
                        <div v-else class="flex-1 ml-2 text-grey">编辑个性签名</div>
                        <span class="fs-xl">&gt;</span>
                     </router-link>
                     <div  class="account-management-main-item p-3 d-flex border-bottom">
                            <span>注册时间</span>
                         <div  v-if="registerTime!=''" class="flex-1 ml-2">{{registerTime}}</div>
                        <div v-else class="flex-1 ml-2 text-grey">xx</div>
                     </div>
            </div>
            <div class="account-management-main mt-3">
                    <div class="p-2 text-grey border-bottom">
                        个人信息
                    </div>
            </div>
        </div>
    </template>
 
    <script>
            export default {
              data() {
                return {
                  model:{},
                  nickname:'',
                  signature:'',
                  registerTime:''
                };
              },
              methods: {
                format(date){
                    var time=new Date(date)
                    var o={
                       'Y':time.getFullYear(),
                       'M':time.getMonth(),
                       'D':time.getDate()
                   }
                   return (o.Y+'/'+(o.M+1)+'/'+(o.D))
                },
                async fetchRegisterTime(){
                   const res=await this.$http.get(`person/register/${localStorage.id}`)
                   this.registerTime=this.format(res.data.createdAt)
                }
            },
            created() {
               localStorage.id && this.fetchNickname() && this.fetchSignature() && this.fetchRegisterTime()
            },
        }
    </script>