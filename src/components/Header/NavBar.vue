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
          <div class="drop__browse">
            <div>
              <h3 class="drop__h3">Women</h3>
              <ul class="drop__ul">
                <li v-for="cloth in clothes" :key="cloth">
                  <a href="#" class="drop__a">{{ cloth }}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="drop__h3">Men</h3>
              <ul class="drop__ul">
                <li v-for="wear in outerWear" :key="wear">
                  <a href="#" class="drop__a">{{ wear }}</a>
                </li>
              </ul>
            </div>
          </div>
        </details>
        <input
          v-model.trim="userSearch"
          placeholder="Search for outwear..."
          type="text"
        />
        <button class="searchBtn">
          <img src="@/assets/img/search.png" alt="search" />
        </button>
      </form>
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

export default {
  name: "NavBar",
  components: { CartOrder, MyAccount, LineBar },
  data() {
    return {
      current: 1,
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
      userSearch: "",
    };
  },
  methods: {
    currentSummary() {
      this.current === 1 ? (this.current = 2) : (this.current = 1);
    },
    filter() {
      this.$store.dispatch("filterProducts", this.userSearch);
      window.scroll(0, 1670);
    },
  },
  watch: {
    current(newValue) {
      newValue === 2
        ? (this.$refs.summary.classList.value = "unListed")
        : (this.$refs.summary.classList.value = "listed");
    },
  },
};
</script>
