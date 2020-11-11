<template>
  <van-tabbar v-model="tabActive"
              route>
    <van-tabbar-item replace
                     to="/"
                     icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="medal-o">专题</van-tabbar-item>
    <van-tabbar-item replace
                     to="/category"
                     icon="qr">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o"
                     to='/buycart'>购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>

export default {
  data () {
    return {
      tabActive: 0
    };
  },
  methods: {},
}

</script>
<style lang='stylus' scoped></style>