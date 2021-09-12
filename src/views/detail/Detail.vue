<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" @imgLoad="imgLoad" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-params-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";

import { backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  mixins: [backTopMixin],
  data() {
    return {
      id: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0],
      getThemeTopY: null,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  created() {
    this.id = this.$route.params.id;
    // 根据id请求数据
    getDetail(this.id).then((res) => {
      const data = res.data.result;
      // 获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取商铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 第一条评论信息 判断有没有评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 获取推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [0];
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    }, 100);
  },
  methods: {
    ...mapActions(["addCart"]),
    imgLoad() {
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.$refs.nav.currentIndex !== i &&
          ((i < this.themeTopYs.length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === this.themeTopYs.length - 1 &&
              positionY >= this.themeTopYs[i]))
        ) {
          this.$refs.nav.currentIndex = i;
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.id = this.id;
      // 将商品添加到购物车里
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then((res) => console.log(res));
      this.addCart(product).then((res) => this.$toast.show(res, 1500));
    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
}
.content {
  position: relative;
  z-index: 9;
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
</style>