<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template #center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script> 

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>