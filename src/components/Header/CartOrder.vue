<template>
  <div class="bin__for__order">
    <div class="bin__img cartRelative" @click="showCart = !showCart">
      <img
        v-if="!cart.length"
        class="header__cart"
        src="@/assets/img/cart_empty.jpg"
        alt="cart"
      />
      <img
        v-if="cart.length"
        class="header__cart"
        src="@/assets/img/cart_full.png"
        alt="cart"
      />
      <span v-if="cart.length" class="cartProductsAmount">{{
        cartProductsAmount
      }}</span>
    </div>
    <div class="product__order" v-show="showCart">
      <p v-if="!cart.length" class="cartItem">В корзине нет товаров</p>
      <div v-else>
        <cart-item
          v-for="item of cart"
          :key="item"
          :cart-item="item"
          @remove="remove"
        >
        </cart-item>
        <div class="your__total__amount">
          <div class="styleForTotal">Total:</div>
          <div class="dollars">{{ totalPrice }}&#36;</div>
        </div>
        <form action="#" class="checkout__go">
          <div class="flex__button__checkout">
            <input type="submit" value="CHECKOUT" class="styleForCheckout" />
          </div>
          <form action="###" class="flex__button__card">
            <input type="submit" value="GO TO CART" class="styleForCard" />
          </form>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/Header/CartItem.vue";

export default {
  name: "CardOrder",
  components: {
    CartItem,
  },
  data() {
    return {
      showCart: false,
    };
  },
  methods: {
    remove(product) {
      if (product.quantity === 1) {
        this.$store.dispatch("remove", product);
      }
      if (product.quantity > 1) {
        this.$store.dispatch("updateQuantity", product);
      }
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartProductsAmount() {
      return this.$store.getters.cartProductsAmount;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
  },
  created() {
    this.$store.dispatch("cartFetch");
  },
};
</script>

<style lang="scss" scoped>
.cartRelative {
  position: relative;
}
.cartProductsAmount {
  position: absolute;
  top: -14px;
  left: 11px;
  border: 1px solid red;
  border-radius: 50%;
  width: 17px;
  height: 16px;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: center;
}
</style>
