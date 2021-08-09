<template>
  <div id="swiper-box">
    <div
      class="swiper"
      ref="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <div class="indicator" v-if="showIndicator && itemCount > 1">
      <div
        class="point"
        v-for="(item, index) in itemCount"
        :key="item"
        :class="{ active: index === currentIndex - 1 }"
      ></div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    animDuration: {
      // 过渡动画持续时间
      type: Number,
      default: 500,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentIndex: 1, // 当前的index
      swiperStyle: {}, // swiper样式
      swiperWidth: 0, // swiper宽度
      itemCount: 0, // swiperItem 个数
      scrolling: false, // 滚动状态
    };
  },
  mounted: function () {
    setTimeout(() => {
      this.handleDom();
      this.runTimer();
    }, 100);
    // this.$nextTick(function () {
    //   this.handleDom();
    //   this.runTimer();
    // });
  },
  methods: {
    // 定时器操作
    runTimer: function () {
      this.timer = setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.swiperWidth);
      }, this.interval);
    },
    stopTimer: function () {
      clearInterval(this.timer);
    },
    // 操作1DOM
    handleDom: function () {
      let swiperEl = this.$refs.swiper;
      // console.log(swiperEl);
      // console.log(swiperEl.children);
      // console.log(swiperEl.children.length);
      this.itemCount = swiperEl.children.length;
      if (this.itemCount > 1) {
        let cloneFirst = swiperEl.children[0].cloneNode(true);
        let cloneLast = swiperEl.children[this.itemCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, swiperEl.children[0]);
        swiperEl.appendChild(cloneFirst);
        this.swiperWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      this.setTransform(-this.swiperWidth);
    },
    // 滚动
    scrollContent: function (currentPosition) {
      this.scrolling = true;
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);
      this.checkPosition();
      this.scrolling = false;
    },
    // 通过设置转换属性滚动轮播图
    setTransform: function (position) {
      this.swiperStyle.transform = "translateX(" + position + "px)";
    },
    // 校验 当滚到最后一个item（复制的第一个） 快速的滚到第一个item
    checkPosition: function () {
      setTimeout(() => {
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.itemCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.swiperWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.itemCount;
          this.setTransform(-this.currentIndex * this.swiperWidth);
        }
      }, this.animDuration);
    },
    touchStart: function (e) {
      if (this.scrolling) return;
      this.stopTimer();
      this.startX = e.touches[0].pageX;
    },
    touchMove: function (e) {
      this.moveX = e.touches[0].pageX;
      // 这是手指拖动的距离 我们要让swiper跟着动
      this.move = this.moveX - this.startX;
      // 计算swiper在哪
      this.currentPosition = -this.currentIndex * this.swiperWidth;
      // 手指拖动swiper跟着移动距离
      let distance = this.currentPosition + this.move;
      this.setTransform(distance);
    },
    touchEnd: function () {
      // 拖动的X轴长度
      let currentMove = Math.abs(this.move);
      if (this.move === 0) {
        return;
      } else if (
        this.move < 0 &&
        currentMove > this.swiperWidth * this.moveRatio
      ) {
        this.currentIndex++;
      } else if (
        this.move > 0 &&
        currentMove > this.swiperWidth * this.moveRatio
      ) {
        this.currentIndex--;
      }
      this.scrollContent(-this.currentIndex * this.swiperWidth);
      this.runTimer();
    },
  },
};
</script>

<style scoped>
#swiper-box {
  position: relative;
  overflow: hidden;
}
.swiper {
  display: flex;
}
.indicator {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 8px;
}
.point {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  margin: 0 5px;
  background-color: #fff;
  border-radius: 4px;
}
.point.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>