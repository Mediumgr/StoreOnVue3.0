<template>
  <div class="header__options center">
    <div class="product__details">Product Details</div>
    <div class="all__details">
      <h3 class="details" v-for="detail in details" :key="detail">
        {{ detail }}
      </h3>
    </div>
  </div>
  <transition appear name="expandProducts" v-if="cart.length !== 0">
    <div>
      <cart-products
        v-for="product in cart"
        :key="product"
        :product="product"
        @remove="removeProduct"
        v-model.number="product.quantity"
      ></cart-products>
    </div>
  </transition>
  <transition name="expand">
    <div v-if="cart.length === 0" class="emptyProducts">
      There is no products in your cart, you can add it
      <router-link :to="{ name: 'ProductPage' }" class="here">
        here</router-link
      >
    </div>
  </transition>
  <div class="choose center">
    <div>
      <button class="push" @click="clearCart">CLEAR SHOPPING CART</button>
    </div>
    <div>
      <router-link :to="{ name: 'ProductPage' }">
        <button class="push">CONTINUE SHOPPING</button>
      </router-link>
    </div>
  </div>
  <div class="fill__your__information center">
    <form
      @submit.prevent="shippingAddress"
      class="shipping"
      v-if="!shipMessage"
    >
      <fieldset>
        <legend class="shipping__address">Shipping Address</legend>
        <select class="city" v-model="select">
          <option value="country" v-for="country in countries" :key="country">
            {{ country }}
          </option>
        </select>
        <input
          required
          type="text"
          placeholder="State"
          class="state"
          v-model="state"
        />
        <input
          required
          type="number"
          placeholder="Postcode / Zip"
          class="zip"
          v-model="zip"
        />
        <button class="get__quote">send info</button>
      </fieldset>
    </form>
    <div class="shipMessage" v-else v-html="shipMessage"></div>
    <form @submit.prevent="findCoupon" class="coupon">
      <fieldset>
        <legend class="coupon__discount">coupon discount</legend>
        <p class="enter__coupon">
          <label for="state">Enter your coupon code if you have one</label>
        </p>
        <input
          type="text"
          id="state"
          placeholder="State"
          class="state"
          v-model.lazy="coupon"
        />
        <div class="flexCoupon">
          <span v-if="show" class="coupon">{{ message }}</span>
          <button class="apply__coupon">Apply coupon</button>
        </div>
      </fieldset>
    </form>
    <div class="amount">
      <p class="grand__total">
        TOTAL <span class="total__amount">{{ totalPrice }} &#36;</span>
      </p>
      <div class="line__amount"></div>
      <button class="proceed" @click="pushToCheckOut">
        proceed to checkout
      </button>
    </div>
  </div>
  <Teleport to="body">
    <transition name="fade">
      <modal-window
        v-if="open"
        @close="open = false"
        @remove="remove"
      ></modal-window>
    </transition>
  </Teleport>
</template>

<script>
import CartProducts from "@/components/CartComp/CartProducts.vue";
import { mapGetters, mapState } from "vuex";
import NProgress from "nprogress";

export default {
  components: {
    CartProducts,
  },
  data() {
    return {
      details: ["unite Price", "quantity", "shipping", "subtotal", "action"],
      countries: ["Russia", "Spain", "United States", "Canada"],
      coupon: "",
      show: false,
      message: "",
      state: "",
      zip: "",
      select: "",
      shipMessage: "",
      open: false,
      product: null,
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
          this.$router.push({
            name: "ErrorDisplay",
            params: { error: error },
          });
        });
    },
    clearCart() {
      let answer = window.confirm("Are you sure to delete all products ?");
      if (answer) {
        this.$store.dispatch("clearCart").catch((error) => {
          this.$router.push({ name: "ErrorDisplay", params: { error: error } });
        });
      }
    },
    findCoupon() {
      if (this.coupon !== "") {
        this.message = "Sorry, such coupon doesn't find..";
      } else {
        this.message = "Please, input your coupon";
      }
      this.show = true;
    },
    shippingAddress() {
      this.shipMessage = `<div style="color: rgb(241, 109, 127)">SHIPPING ADDRESS:</div> <div>Country: ${this.select}, State: ${this.state}, Zip: ${this.zip}</div>`;
    },
    pushToCheckOut() {
      this.$router.push({ name: "CheckOut" });
    },
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["totalPrice"]),
  },
  created() {
    NProgress.start();
    if (this.$store.state.cart) {
      NProgress.done();
    }
  },
};
</script>

<style lang="scss" scoped>
.emptyProducts {
  display: flex;
  justify-content: center;
  height: 110px;
  align-items: center;
  color: red;
}

.here {
  color: blue;
  padding-left: 3px;
}

.flexCoupon {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 65px;
}

.coupon {
  color: red;
}

.shipMessage {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  flex-direction: column;
}

fieldset {
  margin: 0;
  border: 0;
  padding: 0;
}
</style>
