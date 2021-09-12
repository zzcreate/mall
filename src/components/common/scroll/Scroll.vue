<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
 
<script>
import BetterScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bs: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      this.bs = new BetterScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeImage: true,
      });
      // 监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.bs.on("scroll", (position) => {
          this.$emit("scroll", position);
        });
      }
      // 监听上拉事件
      if (this.pullUpLoad) {
        this.bs.on("pullingUp", () => {
          this.$emit("pullingUp");
          this.bs.finishPullUp();
        });
      }
    },
    scrollTo(x, y, time = 300) {
      this.bs && this.bs.scrollTo(x, y, time);
    },
    refresh() {
      this.bs && this.bs.refresh();
    },
  },
};
</script>