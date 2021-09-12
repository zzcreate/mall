<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div>
        <span class="square"></span>
        <span class="line"></span>
      </div>
      <div class="desc">
        {{ detailInfo.desc }}
      </div>
      <div class="right">
        <span class="line"></span>
        <span class="square"></span>
      </div>
    </div>
    <div class="info-key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="info-list">
      <img
        @load="imgLoad"
        v-for="item in detailInfo.detailImage[0].list"
        :src="'http:' + item"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.$emit("imgLoad");
    },
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 0 15px;
}
.desc {
  padding: 15px 0;
  font-size: 14px;
}
.square,
.line {
  display: inline-block;
}
.square {
  width: 5px;
  height: 5px;
  background-color: #333;
}
.line {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info-key {
  margin: 10px 0 10px 15px;
  font-size: 15px;
  color: #333;
}
.info-list img {
  width: 100%;
}
</style>