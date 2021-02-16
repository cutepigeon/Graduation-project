<template>
    <div>
         <m-topbar title="我的收藏" iconfont="icon-fanhui" to="/person/message"></m-topbar>
    <div class="mt-2  bg-white">
       <router-link tag="div" :to="`/myArticleMain/${article._id}`" class="collection-item border-bottom text-center" v-for='article in model.article_body' :key="article._id">
        {{article.title}}
    </router-link>
    </div>
</div>
</template>
<style>
    .collection-item{
        height: 2.5rem;
        width: 100%;
        line-height: 2.5rem;
    }
</style>
<script>
    export default{
        data() {
            return {
                model:{
                    article_body:[{}]
                }
            }
        },
        methods: {
            //对象数组去重
            deDuplicati(arr,key){
              for(let i=0; i<arr.length;i++ ){
                  for(let j=1; j<arr.length;j++){
                      if(arr[i][key]==arr[j][key]){
                          arr.splice(j,1)
                      }
                  }
              }
            },
            async fetchCollection(){
                const res=await this.$http.get(`/person/collection/query/${localStorage.id}`)
                this.model=res.data
                this.deDuplicati(this.model.article_body,'_id')
                // this.model.article_body=Array.from(new Set(this.model.article_body))
            }
        },
        created() {
            localStorage.id && this.fetchCollection()
        },

    }
</script>