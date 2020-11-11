<template>
  <div class="category">
    <van-tabs v-model="active"
              @click="tabClick"
              sticky>
      <van-tab :title="item.name"
               v-for="item in clist"
               :key="item.id">
        <h3>{{item.name}}</h3>
        <p>{{item.front_name}}</p>
        <van-grid :border="false"
                  :column-num="2">
          <van-grid-item v-for="(goods,i) in goodsList"
                         :key="i"
                         :to="'/product/'+goods.id">
            <van-image :src="goods.list_pic_url" />
            <div class="goodstitle">{{goods.name}}</div>
            <p class="goodsprice">￥{{goods.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>

export default {
  props: ['id'],//接受路由传递过来的参数
  data () {
    return {
      active: 0,
      clist: [],//获取的商品列表
      goodsList: []
    };
  },
  methods: {
    async tabClick (name) {
      let id = this.clist[name].id
      let page = 1
      let size = 20
      const { data: res } = await this.$http.get(this.api.GoodsList, { params: { categoryId: id, page, size } })
      this.goodsList = res.data.data
      console.log(this.goodsList);
    }
  },
  async created () {
    const { data: res } = await this.$http.get(this.api.GoodsCategory, { params: { id: this.id } })
    console.log(res);
    this.clist = res.data.brotherCategory
    this.tabClick(this.active)
  },


}

</script>
<style lang='less' scoped>
.van-grid {
  margin-bottom: 50px;
  .goodstitle {
    height: 50px;
  }
  .goodsprice {
    color: red;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>