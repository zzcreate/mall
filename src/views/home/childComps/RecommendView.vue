<template>
  <div class="recommend">
    <div class="rec-item" v-for="item in recommends" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  /* width: 100%; */
  display: flex;
  padding: 10px 0 20px;
  text-align: center;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}
.rec-item {
  flex: 1;
}
.rec-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>