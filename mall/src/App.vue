<template>
  <div id="app">

    <router-view />
    <tab-btn v-show="$route.meta.showBottomTabBar"></tab-btn>
  </div>
</template>
<script>
import tabBtn from './components/tabBtn'
export default {
  components: {
    tabBtn
  }

}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
