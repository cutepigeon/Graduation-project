import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import MyArticleEdit from '../views/MyArticleEdit.vue'
import MyArticleList from '../views/MyArticleList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import IndexArticleEdit from '../views/IndexArticleEdit.vue'
import IndexArticleList from '../views/IndexArticleList.vue'
//引入用户界面
import UserList from '../views/UserList.vue'
import CommentList from '../views/CommentList.vue'
import CommentManage from '../views/CommentManage.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/login',name:'login',component:Login,meta:{isPublic:true}},
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      //分类
      {path:'/categories/create',component:CategoryEdit
      },
      {path:'/categories/list',component:CategoryList
      },
      {path:'/categories/edit/:id',component:CategoryEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
      },
     //文章
     {path:'/articles/create',component:ArticleEdit
    },
    {path:'/articles/list',component:ArticleList
    },
    {path:'/articles/edit/:id',component:ArticleEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
    },
//我的文章
    {path:'/myarticles/create',component:MyArticleEdit
  },
  {path:'/myarticles/list',component:MyArticleList
  },
  {path:'/myarticles/edit/:id',component:MyArticleEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
  },
//广告位
    {path:'/ads/create',component:AdsEdit
  },
  {path:'/ads/list',component:AdsList
  },
  {path:'/ads/edit/:id',component:AdsEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
  },
//管理员
  {path:'/admin_users/create',component:AdminUserEdit
},
{path:'/admin_users/list',component:AdminUserList
},
{path:'/admin_users/edit/:id',component:AdminUserEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
},

//用户管理
//1.用户列表
{path:'/user/edit',component:UserList},
//2.评论管理
{  path:'/article/comment',component:CommentList
},
{path:'/comment/manage/:id',component:CommentManage,props:true}


,
{path:'/indexArticles/create',component:IndexArticleEdit},
{path:'/indexArticles/list',component:IndexArticleList},
{path:'/indexArticles/edit/:id',component:IndexArticleEdit,props:true}

    ]
  },
]
const router = new VueRouter({
  routes
})
//路由守卫，进入每个路由都判断
router.beforeEach((to,from,next)=>{
     if(!to.meta.isPublic && !localStorage.token){
       return next('/login')
     }
     next()
})
export default router
