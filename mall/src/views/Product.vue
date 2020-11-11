<template>
  <div id="product">
    <!-- 头部导航 -->
    <van-nav-bar fixed
                 title="商品"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in productList.gallery"
                      :key="index">
        <img class="swipeimg"
             v-lazy="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 基本报障 -->
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮</span>
    </div>
    <!-- 商品信息 -->
    <div class="productInfo">
      <h3 class="title">{{info.name}}</h3>
      <p class="brief">{{info.goods_brief}}</p>
      <p class="price">￥{{info.retail_price}}</p>
    </div>
    <van-cell title="请选择规格数量"
              is-link />
    <!-- 商品参数 -->
    <div class="proparams">
      <h3>商品参数</h3>
      <div class="porItem"
           v-for="(items,i) in attribute"
           :key="i">
        <span class="title">{{items.name}}</span>
        <span class="value">{{items.value}}</span>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="proDeail"
         v-html="info.goods_desc">
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o"
                             text="购物车"
                             to='/buycart'
                             :info="$store.state.cartTotal.goodsCount" />
      <van-goods-action-icon icon="star-o"
                             text="已收藏" />
      <van-goods-action-button type="warning"
                               text="加入购物车"
                               @click="coosesku" />
      <van-goods-action-button type="danger"
                               text="立即购买" />
    </van-goods-action>
    <!-- 商品规格 -->
    <van-sku v-model="show"
             :sku="sku"
             :goods="goods"
             @buy-clicked="onBuyClicked"
             @add-cart="onAddCartClicked" />
  </div>

</template>

<script>

export default {
  props: ['id'],
  data () {
    return {
      productList: {},
      attribute: {},
      show: false,//sku显示与隐藏
      sku: {
        // 商品 sku 数据
        tree: [
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            's-1': '2', // 规格类目 k_s 为 s1 的对应规格值 id
            's-2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品信息
        picture: '',
        title: ''
      },
    };
  },
  methods: {
    //点击返回
    onClickLeft () {
      this.$router.back()
    },
    // 点击立即购买
    onBuyClicked () {

    },
    // 点击加入购物车
    async onAddCartClicked (skuData) {
      console.log(skuData);
      let connse = skuData.selectedSkuComb['s-1'] + '_' + skuData.selectedSkuComb['s-2']
      console.log(connse);
      let resultpro = this.productList.productList.filter((item, i) => {
        if (item.goods_specification_ids === connse) {
          return true
        } else {
          return false
        }
      })
      console.log(resultpro);
      const { data: res } = await this.$http.post(this.api.CartAdd, {
        goodsId: resultpro[0].goods_id, number: skuData.selectedNum, productId: resultpro[0].id
      })
      console.log(res);
      this.$store.commit('setCartList', res.data.cartList)
      this.$store.commit('setCartTotal', res.data.cartTotal)

    },
    coosesku () {
      this.show = true
    }
  },
  computed: {
    info () {
      if (!this.productList.info) {
        return []
      } else {
        return this.productList.info
      }
    }
  },
  async created () {
    this.$store.dispatch('AjaxCartList')
    const { data: res } = await this.$http.get(this.api.GoodsDetail, { params: { id: this.id } })
    this.productList = res.data
    this.attribute = res.data.attribute
    console.log(this.productList);
    this.goods.picture = res.data.info.primary_pic_url
    this.goods.title = res.data.info.name
    this.sku.price = this.info.retail_price
    this.sku.stock_num = this.info.goods_number
    let tree = []
    res.data.specificationList.forEach(element => {
      let arr = []
      element.valueList.forEach(item => {
        arr.push({
          id: item.id, // skuValueId：规格值 id
          name: item.value, // skuValueName：规格值名称
        })
      });
      tree.push(
        {
          k: element.name, // skuKeyName：规格类目名称
          k_s: 's-' + element.specification_id, // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          v: arr,
          largeImageMode: true, //  是否展示大图模式
        }
      )
    });
    this.sku.tree = tree
  },
}

</script>
<style lang='less' scoped>
* {
  padding: 0;
  margin: 0;
}
#product {
  .swipeimg {
    width: 100%;
  }
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
  .productInfo {
    .title {
      font-weight: 500;
      padding: 10px 0 5px;
    }
    .brief {
      font-size: 12px;
      color: #999;
      padding: 5px;
    }
    .price {
      font-size: 16px;
      color: red;
      padding: 5px;
    }
  }
  .van-cell__title {
    text-align: left;
  }
  .proparams {
    h3 {
      margin-bottom: 15px;
    }
    .porItem {
      margin: 0 auto;
      width: 90%;
      display: flex;
      justify-content: space-between;
      height: 24px;
      color: #999;
      font-size: 14px;
      background-color: #efefef;
      align-items: center;
      text-align: left;
      .title {
        width: 45px;
        padding: 0 10px;
        border-right: 1px solid #ccc;
      }
      .value {
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  /deep/.proDeail {
    margin-top: 20px;
    width: 100%;
    img {
      width: 100%;
      vertical-align: middle;
      font-size: 0;
    }
  }
}
</style>