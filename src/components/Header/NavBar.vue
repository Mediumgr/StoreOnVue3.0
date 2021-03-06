<template>
  <div class="header center">
    <div class="header__left">
      <router-link :to="{ name: 'MainPage' }" custom v-slot="{ navigate }">
        <span class="logo" @click="navigate">
          <img
            class="logo__img"
            src="@/assets/img/logo.png"
            alt="logo"
            role="link"
          />
          BRAN
          <span class="letter">D</span>
        </span>
      </router-link>
      <form @submit.prevent="filter" class="header__form">
        <details>
          <summary ref="summary" class="listed" @click="currentSummary">
            <span>Browse</span>
          </summary>
          <div class="drop__browse" v-if="showList">
            <div>
              <h3 class="drop__h3">Women</h3>
              <transition-group
                appear
                tag="ul"
                @before-enter="beforeEnter"
                @enter="enter"
                :css="false"
                class="drop__ul"
              >
                <li v-for="cloth in clothes" :key="cloth">
                  <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                    cloth
                  }}</router-link>
                </li>
              </transition-group>
            </div>
            <div>
              <h3 class="drop__h3">Men</h3>
              <transition-group
                appear
                tag="ul"
                @before-enter="beforeEnter"
                @enter="enter"
                :css="false"
                class="drop__ul"
              >
                <li v-for="wear in outerWear" :key="wear">
                  <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                    wear
                  }}</router-link>
                </li>
              </transition-group>
            </div>
          </div>
        </details>
        <input
          v-model.trim="userProductSearch"
          placeholder="Search for outwear..."
          type="text"
        />
        <button class="searchBtn">
          <img src="@/assets/img/search.png" alt="search" />
        </button>
      </form>
      <span class="filtered" v-if="show"
        >Found products: {{ filteredLength }}</span
      >
    </div>
    <div class="header__right">
      <cart-order></cart-order>
      <my-account></my-account>
    </div>
  </div>
  <line-bar :clothes="clothes"></line-bar>
</template>

<script>
import CartOrder from "@/components/Header/CartOrder.vue";
import MyAccount from "@/components/Header/MyAccount.vue";
import LineBar from "@/components/Header/LineBar.vue";
import Velocity from "velocity-animate";
import { mapGetters, mapState } from "vuex";

export default {
  name: "NavBar",
  components: { CartOrder, MyAccount, LineBar },
  data() {
    return {
      current: 1,
      showList: true,
      clothes: [
        "Dresses",
        "Tops",
        "Sweaters / Knits",
        "Jackets / Coats",
        "Blazers",
        "Denim",
        "Leggings",
        "Skirts / Shorts",
        "Accessories",
      ],
      outerWear: [
        "Tees/Tank tops",
        "Shirts/Polos",
        "Sweaters",
        "Sweatshirts/Hoodies",
        "Blazers",
        "Jackets/vests",
      ],
      userProductSearch: "",
      show: false,
    };
  },
  methods: {
    currentSummary() {
      this.current === 1 ? (this.current = 2) : (this.current = 1);
      this.showList = false;
      this.$nextTick(() => {
        this.showList = true;
      });
    },
    filter() {
      this.$store
        .dispatch("actionForFilter", this.userProductSearch)
        .finally(() => {
          this.show = true;
        });
    },
    beforeEnter(el) {
      el.style.height = 0;
    },
    enter(el, done) {
      Velocity(
        el,
        { height: "28px" },
        { duration: 1200, easing: "ease", complete: done }
      );
    },
  },
  computed: {
    ...mapState(["userSearch"]),
    ...mapGetters(["filteredLength"]),
  },
  watch: {
    current(newValue) {
      newValue === 2
        ? (this.$refs.summary.classList.value = "unListed")
        : (this.$refs.summary.classList.value = "listed");
    },
    show(newValue) {
      if (newValue === true) {
        setTimeout(() => {
          this.show = false;
        }, 5000);
      }
    },
    userSearch() {
      if (this.$store.state.userSearch === "") {
        this.userProductSearch = "";
      }
    },
  },
};
</script>
