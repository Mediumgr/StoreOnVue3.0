<template>
  <div class="bin__for__order">
    <div class="bin__img" @click="showCart = !showCart">
      <img class="header__cart" src="@/assets/img/cart_empty.jpg" alt="cart" />
    </div>
    <div class="product__order" v-show="showCart">
      <p v-if="!cartItems.length" class="cartItem">В корзине нет товаров</p>
      <cart-item
        v-for="item of cartItems"
        :key="item"
        :cart-item="item"
        @remove="remove"
      >
      </cart-item>
      <div class="your__total__amount" v-if="cartItems.length">
        <div class="styleForTotal">Total</div>
        <div class="dollars">&#36;{{ totalPrice }}</div>
      </div>
      <form action="#" class="checkout__go" v-if="cartItems.length">
        <div class="flex__button__checkout">
          <input type="submit" value="CHECKOUT" class="styleForCheckout" />
        </div>
        <form action="###" class="flex__button__card">
          <input type="submit" value="GO TO CART" class="styleForCard" />
        </form>
      </form>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/Header/CartItem.vue";
import EventService from "@/services/EventService.js";

export default {
  name: "CardOrder",
  components: {
    CartItem,
  },
  data() {
    return {
      cartItems: [],
      showCart: false,
      totalPrice: "",
    };
  },
  methods: {
    /*  addProduct(product) {
      let find = this.cartItems.find(
        (el) => el.id_product === product.id_product
      );
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, {
          quantity: 1,
        });
        find.quantity++;
      } else {
        let prod = Object.assign(
          {
            quantity: 1,
          },
          product
        );
        this.$parent.postJson("/api/cart", prod).then((data) => {
          if (data.result === 1) {
            this.cartItems.push(prod);
            this.productsPriceShow();
            this.changeIcon();
          }
        });
      }
      this.productsPriceShow();
    },
    remove(item) {
      if (item.quantity > 1) {
        this.$parent
          .putJson(`/api/cart/${item.id_product}`, {
            quantity: -1,
          })
          .then((data) => {
            if (data.result === 1) {
              item.quantity--;
              this.productsPriceShow();
              this.changeIcon();
            }
          });
      } else {
        this.$parent.deleteJson(`/api/cart/${item.id_product}`).then((data) => {
          if (data.result === 1) {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
            this.productsPriceShow();
            this.changeIcon();
          }
        });
      }
    },
    productsPriceShow() {
      this.totalPrice = this.calcSum();
    },
    calcSum() {
      return this.cartItems.reduce(
        (accum, item) => accum + item.price * item.quantity,
        0
      );
    },
    changeIcon() {
      if (this.cartProductsAmount !== 0) {
        this.$el.childNodes[0].innerHTML = `<div class="bin__img" @click="showCart=!showCart"><img class="header__cart" src="./img/cart.png" alt="cart"></div><span class="cartAmount">${this.cartProductsAmount}</span>`;
      } else {
        this.$el.childNodes[0].innerHTML = `<div class="bin__img" @click="showCart=!showCart"><img class="header__cart" src="./img/cart_empty.jpg" alt="cart"></div>`;
      }
    }, 
  },
  computed: {
    cartProductsAmount() {
      return this.cartItems.reduce((accum, item) => accum + item.quantity, 0);
    },*/
  },
  created() {
    /*   this.$parent.getJson("/api/cart").then((data) => {
      for (let el of data.contents) {
        this.cartItems.push(el);
        this.productsPriceShow();
      }
    }); */
    EventService.getProductFromCart().then((data) => {
      console.log(data.data);
      /*       for (let el of data.data) {
        this.cartItems.push(el);
        this.productsPriceShow();
      } */
    });
  },
};
</script>
