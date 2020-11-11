<template>
  <div class="buycart">
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮</span>
    </div>
    <div class="list">
      <div class="cartitem"
           v-for="(goods,i) in cartList"
           :key="i">
        <van-checkbox @change="checkEnd($event,goods)"
                      v-model="goods.checked"></van-checkbox>
        <van-image width="100"
                   height="100"
                   :src="goods.list_pic_url"
                   cover />
        <div class="listinfo">
          <div class="title">
            {{goods.goods_name}}
            <span class="num">*{{goods.number}}</span>
          </div>
          <p class="brief">{{goods.goods_specifition_name_value}}</p>
          <p class="price">￥{{goods.retail_price}}</p>
        </div>
      </div>
    </div>
    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100"
                    button-text="提交订单"
                    @submit="onSubmit">
      <van-checkbox v-model="checkedAll">全选</van-checkbox>

    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      checked: true
    };
  },
  methods: {
    onSubmit () { },
    async checkEnd (even, goods) {

      console.log(even, goods);
      const { data: res } = await this.$http.post(this.api.CartChecked, { isChecked: Number(even), productIds: goods.product_id })
      console.log(res);
      this.$store.commit('setCartList', res.data.cartList)
      this.$store.commit('setCartTotal', res.data.cartTotal)
    }
  },
  created () {
    this.$store.dispatch('AjaxCartList')

  },
  computed: {
    ...mapState(['cartList', 'cartTotal']),
    checkedAll: {
      set (value) {
        console.log(value);
      },
      get () {
        if (this.cartTotal.goodsCount === this.cartTotal.checkedGoodsCount) {
          return true
        } else {
          return false
        }
      }
    }
  },
  mounted () {
    console.log(this.cartTotal);
  },
}

</script>
<style lang='less' scoped>
.buycart {
  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    color: #999;
    height: 24px;
    background-color: #efefef;
    span {
      display: flex;
      align-items: center;
    }
    span::before {
      content: "";
      display: block;
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .cartitem {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;
    .listinfo {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      height: 70px;
      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
    .brief {
      color: #ccc;
      font-size: 12px;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>