<template>
  <div class="shop-info">
    <div class="logo">
      <img :src="'http:' + shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="centenr-info">
      <div class="left-info">
        <div class="sells-info">
          <div class="sells-count">{{ shopSells }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="count-info">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">宝贝</div>
        </div>
      </div>
      <div class="right-info">
        <ul>
          <li v-for="item in shop.score">
            <span class="column">{{ item.name }}</span>
            <span class="score" :class="{ 'score-better': item.isBetter }">{{
              item.score
            }}</span>
            <span class="better" :class="{ bbetter: item.isBetter }">{{
              item.isBetter ? "高" : "低"
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="entry">
      <button class="enter">进店逛逛</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    shopSells() {
      if (this.shop.sells < 10000) {
        return this.shop.sells;
      }
      return (this.shop.sells / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.logo img {
  margin-right: 10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}
.centenr-info {
  margin-top: 15px;
  color: #333;
  align-items: center;
}
.centenr-info,
.left-info {
  display: flex;
}
.left-info,
.right-info {
  flex: 1;
}
.left-info {
  justify-content: space-evenly;
  text-align: center;

  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.sells-count,
.goods-count {
  font-size: 18px;
}
.sells-text,
.goods-text {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
.right-info {
  font-size: 13px;
}
.right-info ul li {
  padding: 5px 0;
  list-style: none;
}
.column {
  padding: 0 15px 0 30px;
}
.better {
  margin-right: 8px;
  float: right;
}
.score {
  color: #5ea732;
}
.right-info .score-better {
  color: #fe313a;
}
.better {
  color: #fff;
  background-color: #5ea732;
}
.right-info .bbetter {
  background-color: #fe313a;
}
.entry {
  margin-top: 10px;
  text-align: center;
}
.enter {
  width: 150px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: #f2f5f8;
  border: none;
  border-radius: 10px;
}
</style>