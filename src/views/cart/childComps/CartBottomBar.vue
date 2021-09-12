<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div>合计：{{ totalPrice }}</div>
    <div @click="calcClick" class="calculate">去结算：({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.some((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  justify-content: space-around;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}
.check-button {
  margin-right: 5px;
  line-height: 20px;
}
.check-content {
  display: flex;
  align-items: center;
}
.calculate {
  height: 30px;
  margin-top: 5px;
  padding: 0 10px;
  background-color: red;
  color: #fff;
  border-radius: 20px;
  line-height: 30px;
}
</style>