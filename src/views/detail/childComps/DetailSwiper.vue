<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="'http:' + item" alt="" @load="imgLoad" />
      </swiper-item>
    </swiper>
  </div>
</template> 
 
<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
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
.detail-swiper {
  height: 300px;
}
</style>