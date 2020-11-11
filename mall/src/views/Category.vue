<template>
  <div>
    <!-- 搜索 -->
    <van-search placeholder="商品搜索 共239万款好物"
                input-align='center'
                v-model="searchData" />
    <!-- 分类 -->
    <van-tree-select :items="items"
                     :main-active-index.sync="activeIndex"
                     height='calc(100vh - 104px)'
                     @click-nav='changeRight'>
      <template #content>
        <img :src="bannerImage"
             alt=""
             class="imgBanner">
        <van-grid :column-num="3">
          <van-grid-item v-for="(goods,i) in subCategoryList"
                         :key="i"
                         icon="photo-o"
                         :text="goods.name"
                         :to="'/categoryList/'+goods.id">
            <van-image :src="goods.wap_banner_url" />
            <p>{{goods.name}}</p>
          </van-grid-item>
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>

<script>

export default {
  data () {
    return {
      searchData: "",
      //   items: [{ text: '分组 1' }, { text: '分组 2' }],

      activeIndex: 0,
      data: {},
      subCategoryList: [],
      bannerImage: ''
    };
  },
  methods: {
    changeRight (index) {
      this.activeIndex = index
    }
  },
  async created () {
    let res = await this.$http.get(this.api.CatalogList)
    this.data = res.data.data
    console.log(this.data);
    this.subCategoryList = this.data.currentCategory.subCategoryList
    this.bannerImage = this.data.currentCategory.banner_url;
  },
  computed: {
    items () {
      console.log(this.data.categoryList);
      if (!this.data.categoryList) {
        return []
      } else {
        let arr = []
        this.data.categoryList.forEach(element => {
          element.text = element.name
          arr.push(element)
        });
        return arr
      }
    },
  },
  watch: {
    async activeIndex () {
      if (this.items.length !== 0) {
        let arr = this.items[this.activeIndex].id
        console.log(arr);
        let res = await this.$http.get(this.api.CatalogCurrent, { params: { id: arr } })
        console.log(res.data);
        this.subCategoryList = res.data.data.currentCategory.subCategoryList
        this.bannerImage = res.data.data.currentCategory.banner_url
      } else {
        this.subCategoryList = []
      }
    }
  }

}

</script>
<style lang='less' scoped>
.imgBanner {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>