import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
//lol
import { Home, HomePage, Article } from '../views/LOL'
//我的文章
import { MyArticleIndex, Categories, ArticleCatalog, MyArticleMain } from '../views/myArticle'

//vip
import { VipLogin, LoginPage, Register } from '../views/vip'
//个人信息
import { Message, AccountManage, ManagePage } from '../views/Person'
import {Nickname,Signature,Collection,Recharge} from '../views/Person/AccountMessage'
//一些小功能
import {SmallFuction,CodeTest} from '../views/CodeTest'
Vue.use(VueRouter)

const routes = [
  {
    path: '/vip/login', name: 'vipLogin', component: VipLogin, props: true, meta: { isPublic: true },
    children: [{ path: '/', component: LoginPage },
    { path: '/vip/register', component: Register }]
  },
  {
    path: '/',
    component: Main,
  },
  //个人信息页面
  { path: '/person/message', component: Message },
  {
    path: '/account/management', component: AccountManage,
    children: [{
      path: '/', component: ManagePage,
    }]
  },
  {
    path:'/nickname',component:Nickname
  },
    {
    path:'/signature',component:Signature
  },
  {
    path:'/account/collection',component:Collection
  },
  {
    path:'/account/recharge',component:Recharge
  },
  //英雄联盟
  {
    path: '/lol/index', component: Home,
    children: [
      { path: '/', name: 'HomePage', component: HomePage },
      { path: '/articles/:id', name: 'articles', component: Article, props: true },
    ]
  },
 
  //我的文章
  {
    path: '/myArticle/index', component: MyArticleIndex,
    children: [
      { path: '/', component: Categories },
      { path: '/articleCatalog/:id', name: 'article', component: ArticleCatalog, props: true },
      { path: '/myArticleMain/:id', component: MyArticleMain, props: true }
    ]
  },

  //在线模块
  {
    path:'/online',component:SmallFuction,children:[{
      path:'/',component:CodeTest
    }]
  }


]
const router = new VueRouter({
  routes
})
// router.beforeEach((to,from,next)=>{
//   if(!to.meta.isPublic && !localStorage.token){
//     return next('/vip/login')
//   }
//   next()
// })

export default router
