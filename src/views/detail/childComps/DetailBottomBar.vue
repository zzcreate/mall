<template>
  <div class="buttom-bar">
    <div class="bar-left">
      <div class="item">
        <i class="icon icon-service"></i>
        <p>客服</p>
      </div>
      <div class="item">
        <i class="icon icon-shop"></i>
        <p>店铺</p>
      </div>
      <div class="item">
        <i class="icon icon-collect"></i>
        <p>收藏</p>
      </div>
    </div>
    <div class="bar-right">
      <div class="item add-car" @click="addToCart">加入购物车</div>
      <div class="item buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
    },
  },
};
</script>
<style scoped>
.buttom-bar {
  position: relative;
  z-index: 10;
  height: 49px;
  display: flex;
  background-color: #fff;
  text-align: center;
}
.bar-left,
.bar-right {
  display: flex;
  flex: 1;
}
.item {
  flex: 1;
}
.icon {
  display: block;
  width: 22px;
  height: 22px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 3px 0;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.icon-service {
  background-position: 0 -53px;
}
.icon-shop {
  background-position: 0 -98px;
}
.icon-collect {
  background-position: 0 0px;
} 
.bar-right {
  line-height: 49px;
}
.add-car {
  background-color: #ffe817;
}
.buy {
  color: #fff;
  background-color: #f69;
}
</style>