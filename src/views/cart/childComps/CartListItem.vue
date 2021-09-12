<template>
  <div class="item">
    <div class="item-selector">
      <check-button :is-checked="product.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="item-bottom clear-fix">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkbutton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style scoped>
.item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.item-info {
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  font-size: 17px;
  color: #333;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-desc {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}
.item-bottom {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 15px;
}
.item-price {
  color: orangered;
}
.item-selector {
  display: flex;
  align-items: center;
}
</style>