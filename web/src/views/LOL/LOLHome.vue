<template>
  <div class="home">
    <topbar-menu>
        <img src="../../assets/LOL/logo-public.png" height="30">
    <div class="px-1 pt-1 flex-1">
        <!--flex:1能让div填满-->
        <div class="text-white">NEWS</div>
        <div class="text-grey-1 fs-xxs">新闻资讯</div>
    </div>
    </topbar-menu>
    <router-view/>
  </div>

</template>

