<template>
  <div class="arrivals center">
    <div class="new__arrivals">new arrivals</div>
    <nav class="breads__arrivals">
      <span class="home">Home /</span>
      <span class="men">Men /</span>
      <span class="small__arrivals">New Arrivals</span>
    </nav>
  </div>
  <router-link :to="{ name: 'SinglePage' }" class="floating-button">
    <button class="raise">DON'T FORGET TO LOOK SPECIAL OFFER</button>
  </router-link>
  <div class="Form__for__client center">
    <details class="Common__details">
      <summary class="CommonInformation">
        <span class="padding__shipping">01.</span>Shipping Adress
      </summary>
      <div :class="display" class="shipping__block center" v-if="user === null">
        <div>
          <div class="flex__data">
            <div class="addressForClient">
              <h3 class="guestRegister">Check as a guest or register</h3>
              <h4 class="RegisterWithUs">
                Register with us for future convenience
              </h4>
              <input
                type="radio"
                name="checkradio"
                id="checkout"
                class="checkradio"
                value="guest"
                v-model="picked"
              />
              <label for="checkout" class="checkoutRadio"
                >checkout as guest</label
              >
              <input
                type="radio"
                name="checkradio"
                id="register"
                class="checkradio"
                value="register"
                v-model="picked"
              />
              <label for="register" class="checkoutRadio">register</label>
              <h3 class="save__me">register and save time!</h3>
              <h4 class="RegisterWithUs">
                Register with us for future convenience
              </h4>
              <h4 class="Fast__and__easy">
                <i class="fa-solid fa-angles-right fa-xs"></i>Fast and easy
                checkout
              </h4>
              <h4 class="Easy__access">
                <i class="fa-solid fa-angles-right fa-xs"></i>Easy access to
                your order history and status
              </h4>
              <button
                class="continue"
                @click="goAhead"
                v-if="picked === 'guest'"
              >
                continue
              </button>
            </div>
            <form @submit.prevent="register" :class="registerClass">
              <fieldset>
                <legend class="already__registed">Registeration form</legend>
                <h4 class="log__below">Please log in below</h4>
                <label for="email__address" class="email__address"
                  >EMAIL ADDRESS<span class="snowflake">*</span></label
                >
                <input
                  type="email"
                  id="email__address"
                  class="email__input"
                  v-model.lazy.trim="email"
                />
                <span class="error">{{ errorEmailMessage }}</span>
                <label for="phone" class="password"
                  >phone<span class="snowflake">*</span></label
                >
                <input
                  type="text"
                  id="phone"
                  class="email__input"
                  v-model.lazy.trim="phone"
                />
                <span class="error">{{ errorPhoneMessage }}</span>
                <label for="name" class="password"
                  >name<span class="snowflake">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  class="email__input"
                  v-model.lazy.trim="name"
                />
                <span class="error">{{ errorNameMessage }}</span>
                <h4 class="Required__field">* Required Fileds</h4>
                <button class="Log__in">Register</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div v-else class="loginText">
        {{ message }}
        <i
          class="fa-solid fa-arrow-right-from-bracket logout"
          @click="open = true"
        ></i>
        <Teleport to="body">
          <transition name="fade">
            <modal-exit-window
              v-if="open"
              @close="open = false"
              @confirm="logOut"
            ></modal-exit-window>
          </transition>
        </Teleport>
      </div>
    </details>
    <details class="Common__details">
      <summary class="CommonInformation">
        <span class="padding__shipping">02.</span>BILLING INFORMATION
      </summary>
      <p class="Lorem">
        Payment for the order in cash to the courier upon delivery of the
        goods.You can pay the order to the courier in cash in rubles directly at
        the time of delivery or by credit card
      </p>
    </details>
    <details class="Common__details">
      <summary class="CommonInformation">
        <span class="padding__shipping">03.</span>SHIPPING INFORMATION
      </summary>
      <p class="Lorem">
        We ship to Canada, Australia, New Zealand, and the United Kingdom via
        USPS Priority Mail International. Allow 2-3 weeks for international
        deliveries. Please contact us in advance if your order will be over $500
        so that we can provide you with the best shipping option and rate.
      </p>
    </details>
    <details class="Common__details">
      <summary class="CommonInformation">
        <span class="padding__shipping">04.</span>SHIPPING METHOD
      </summary>
      <p class="Lorem">By airplane, trains, cars.</p>
    </details>
    <details class="Common__details">
      <summary class="CommonInformation">
        <span class="padding__shipping">05.</span>PAYMENT METHOD
      </summary>
      <p class="Lorem">Cash or any bank card.</p>
    </details>
    <details class="Common__details">
      <summary class="CommonInformation">
        <span class="padding__shipping">06.</span>ORDER REVIEW
      </summary>
      <p class="Lorem">
        We will automatically email your tracking information to you when your
        order ships. If you did not receive this email, we are happy to resend
        it. Please email us
      </p>
    </details>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  data() {
    return {
      picked: "guest",
      message: "You are already logged in",
      email: "",
      phone: "",
      name: "",
      open: false,
      display: {
        none: false,
        block: true,
      },
      registerClass: {
        none: true,
        block: false,
      },
      patterns: {
        name: /^[a-zа-яё]+$/i,
        phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
        email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
      },
      errors: {
        name: "No spaces are allowed, only letters",
        phone: "The phone should be like:  +7(000)000-0000",
        email: "E-mail should be like: mymail@mail.ru",
      },
      errorNameMessage: "",
      errorEmailMessage: "",
      errorPhoneMessage: "",
    };
  },
  methods: {
    goAhead() {
      if (this.picked && localStorage.getItem("Login")) {
        this.message = this.$store.commit(
          "USER",
          JSON.parse(localStorage.getItem("Login"))
        );
        "You are logged in as " + JSON.parse(localStorage.getItem("Login"));
        this.display.none = true;
      }
      if (this.picked === "guest" && !localStorage.getItem("Login")) {
        this.message = "You've logged in as Guest";
        localStorage.setItem("Login", JSON.stringify("Guest"));
        this.$store.commit("USER", JSON.parse(localStorage.getItem("Login")));
        this.display.none = true;
      }
    },
    logOut() {
      this.$store.commit("USER", null);
      localStorage.clear();
      this.display.block = true;
      this.registerClass.none = true;
      this.registerClass.block = false;
      this.picked = "guest";
      this.open = false;
    },
    register() {
      if (
        this.errorNameMessage === "" &&
        this.errorEmailMessage === "" &&
        this.errorPhoneMessage === "" &&
        this.email &&
        this.name &&
        this.phone
      ) {
        this.$store.commit("USER", this.name);
        localStorage.setItem("Login", JSON.stringify(this.name));
      }
      if (!this.name) {
        this.errorNameMessage = "Please, type your name";
      }
      if (!this.email) {
        this.errorEmailMessage = "Please, type your email";
      }
      if (!this.phone) {
        this.errorPhoneMessage = "Please, type your phone";
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    NProgress.start();
    this.$store.commit("CART_STATUS", false);
    this.$store
      .dispatch("user", JSON.parse(localStorage.getItem("Login")))
      .then(() => {
        NProgress.done();
      });
  },
  watch: {
    picked() {
      if (this.picked === "register") {
        this.registerClass.none = false;
        this.registerClass.block = true;
      } else {
        this.registerClass.none = true;
        this.registerClass.block = false;
      }
    },
    name() {
      let passed = this.patterns.name.test(this.name);
      if (!passed) {
        this.errorNameMessage = this.errors.name;
      } else this.errorNameMessage = "";
    },
    phone() {
      let passed = this.patterns.phone.test(this.phone);
      if (!passed) {
        this.errorPhoneMessage = this.errors.phone;
      } else this.errorPhoneMessage = "";
    },
    email() {
      let passed = this.patterns.email.test(this.email);
      if (!passed) {
        this.errorEmailMessage = this.errors.email;
      } else this.errorEmailMessage = "";
    },
    user() {
      this.message = "You are logged in as " + this.user;
      this.display.none = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.loginText {
  color: rgb(68, 21, 21);
  margin-top: 10px;
}

.displayNone {
  display: none;
}

.block {
  display: block;
}

.none {
  display: none;
}

.logout {
  padding-left: 5px;
  cursor: pointer;
}

.error {
  color: red;
  display: block;
  padding-bottom: 10px;
}

.Log__in {
  color: #000000;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 180px;
  height: 50px;
  border: 1px solid #eaeaea;
  background-color: #ffffff;
  outline: none;
  cursor: pointer;
  float: left;
  margin-right: 30px;
  transition: 0.5s;

  &:hover {
    color: white;
    background: #ff8b9d;
    transform: scale(0.9, 0.9);
  }
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

.raise {
  background: none;
  outline: none;
  overflow: hidden;
  border: none;
  font: inherit;
  padding: 0.5em 0.5em;
  cursor: pointer;
  color: white;
  letter-spacing: 2px;
}

.floating-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  margin: 30px auto 0;
  font-size: 11px;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
  font-weight: 600;
  background: rgba(241, 109, 127, 1);
  box-shadow: 0px 0px 15px 3px #f16d7f;
  transition: 0.4s;
}
.floating-button:hover {
  background: #2ee59d;
  box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
  transform: translateY(-7px);
}
</style>
