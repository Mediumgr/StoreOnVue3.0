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
        v-else
        class="header__cart"
        src="@/assets/img/cart_full.png"
        alt="cart"
      />
      <span v-if="cart.length" class="cartProductsAmount">{{
        cartProductsAmount
      }}</span>
    </div>
    <div class="product__order" v-show="showCart">
      <p v-if="!cart.length" class="cartItem">No products in your cart</p>
      <div v-else>
        <template v-for="(item, index) of cart">
          <cart-item
            v-if="cart.length && index < 2"
            :key="item.id"
            :cartItem="item"
            @remove="removeProduct"
          >
          </cart-item>
        </template>
        <div v-show="cart.length > 2" class="seeMore">
          <router-link :to="{ name: 'GoToCart' }">
            Go to cart to see more<i
              class="fa-solid fa-arrow-right-to-bracket iconLong"
            ></i>
          </router-link>
        </div>
        <div class="your__total__amount">
          <div class="styleForTotal">Total:</div>
          <div class="dollars">{{ totalPrice }}&#36;</div>
        </div>
        <div class="checkout__go">
          <div class="flex__button__checkout" @click="goToCheckout">
            <input type="submit" value="CHECKOUT" class="styleForCheckout" />
          </div>
          <router-link :to="{ name: 'GoToCart' }">
            <div class="flex__button__card">
              <input type="submit" value="GO TO CART" class="styleForCard" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <modal-window
        v-if="open"
        @close="open = false"
        @remove="remove"
      ></modal-window>
    </Transition>
  </Teleport>
</template>

<script>
import CartItem from "@/components/Header/CartItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "CardOrder",
  components: {
    CartItem,
  },
  data() {
    return {
      showCart: false,
      product: null,
      open: false,
    };
  },
  methods: {
    removeProduct(product) {
      this.product = product;
      this.open = true;
    },
    remove() {
      this.$store
        .dispatch("remove", this.product)
        .then(() => {
          this.open = false;
        })
        .catch((error) => {
          this.$router.push({ name: "ErrorDisplay", params: { error: error } });
        });
    },
    goToCheckout() {
      this.$router.push({ name: "CheckOut" });
    },
  },
  computed: {
    ...mapGetters(["totalPrice", "cartProductsAmount"]),
    cart() {
      return this.$store.state.cart;
    },
  },
  created() {
    this.$store.dispatch("cartFetch").catch((error) => {
      this.$router.push({
        name: "ErrorDisplay",
        params: { error: error },
      });
    });
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
.seeMore {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
}

.iconLong {
  padding-left: 5px;
  padding-top: 3px;
}
</style>
