<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="title">
      {{ goods.title }}
    </div>
    <div class="price">
      <span class="new-price" :style="{ color: goods.discountBg }">{{
        goods.newPrice
      }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span
        class="discount"
        v-if="goods.discount"
        :style="{ background: goods.discountBg }"
        >{{ goods.discount }}</span
      >
    </div>
    <div class="other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="services">
      <span v-for="index in goods.services.length - 1" :key="index">
        <img :src="'http:' + goods.services[1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  border-bottom: 5px solid #f2f5f8;
  color: #999;
  font-size: 13px;
}
.title {
  color: #222;
  font-size: 16px;
}
.price {
  margin: 10px 0 15px 5px;
}
.new-price {
  font-size: 24px;
}
.old-price {
  margin: 0 10px;
  text-decoration: line-through;
}
.discount {
  position: relative;
  top: -8px;
  padding: 2px 5px;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
}
.other,
.services {
  display: flex;
  justify-content: space-between;
}
.other {
  line-height: 30px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.services {
  /* line-height: 50px; */
  margin-top: 20px;
  height: 40px;
  color: #333;
}
.services img {
  position: relative;
  top: 2px;
  left: -2px;
  width: 14px;
  height: 14px;
}
</style>