<template>
  <div class="header__options center">
    <div class="product__details">Product Details</div>
    <div class="all__details">
      <h3 class="details" v-for="detail in details" :key="detail">
        {{ detail }}
      </h3>
    </div>
  </div>
  <template v-for="product in cart" :key="product">
    <cart-products
      v-if="cart.length !== 0"
      :product="product"
      @remove="removeProduct"
    ></cart-products>
  </template>
  <div v-if="cart.length === 0" class="emptyProducts">
    There is no products in your cart, you can add it
    <router-link :to="{ name: 'ProductPage' }" class="here"> here</router-link>
  </div>
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
    <div class="shipping" v-if="!shipMessage">
      <h2 class="shipping__address">Shipping Address</h2>
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
      <button class="get__quote" @click="shippingAddress">send info</button>
    </div>
    <div class="shipMessage" v-else v-html="shipMessage"></div>
    <div class="coupon">
      <h2 class="coupon__discount">coupon discount</h2>
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
        <button class="apply__coupon" @click="findCoupon">Apply coupon</button>
      </div>
    </div>
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
    <modal-window
      v-if="open"
      @close="open = false"
      @remove="remove"
    ></modal-window>
  </Teleport>
</template>

<script>
import CartProducts from "@/components/CartComp/CartProducts.vue";
import ModalWindow from "@/views/ModalWindow/ModalWindow.vue";
import { mapGetters, mapState } from "vuex";
import NProgress from "nprogress";

export default {
  components: {
    CartProducts,
    ModalWindow,
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
      this.$store.dispatch("clearCart").catch((error) => {
        this.$router.push({ name: "ErrorDisplay", params: { error: error } });
      });
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
</style>
