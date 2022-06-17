<template>
  <div class="surfer">
    <div class="content center">
      <div>
        <transition :key="renderComponent" appear name="fadeShow">
          <div>
            <div
              class="pre__bottom__block"
              v-for="person in persons"
              :key="person.id"
            >
              <div v-show="person.active" class="personActive">
                <div class="foto">
                  <img
                    :src="require(`@/assets/img/${person.src}`)"
                    :alt="person.name"
                    class="img"
                  />
                </div>
                <div class="france">
                  <h3 class="text__france">&#171;{{ person.text }}&raquo;</h3>
                  <h3 class="guestName">{{ person.name }}</h3>
                  <h4 class="guestLocation">{{ person.location }}</h4>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <div class="gorizontal__bar">
          <div
            ref="bar"
            class="bar"
            v-for="(n, index) in persons.length"
            :key="n"
            :class="{
              active: activeClass === index,
            }"
          ></div>
        </div>
      </div>
      <div>
        <div class="subscribeInfo">
          <h1 class="subscribe">Subscribe</h1>
          <h3 class="newletter">FOR OUR NEWLETTER AND PROMOTION</h3>
        </div>
        <form @submit.prevent="checkEmail" class="right__button">
          <input
            type="text"
            v-model="userEmail"
            placeholder="Enter Your Email"
            class="email"
          />
          <button class="subscribe__button">Subscribe</button>
        </form>
        <p class="emailError" v-show="correctEmail === false">
          {{ error }}
        </p>
        <p class="emailSuccess" v-show="correctEmail === true">
          {{ success }}
        </p>
      </div>
    </div>
  </div>
  <div class="last__page center">
    <div class="left__side__bottom">
      <div class="bottom__logo">
        <router-link :to="{ name: 'MainPage' }" class="logo">
          <img
            class="logo__img"
            src="@/assets/img/logo.png"
            alt="logo"
          />BRAN<span>D</span></router-link
        >
      </div>
      <div class="bottom__page">
        <div class="upper__text">
          Objectively transition extensive data rather than cross functional
          solutions. Monotonectally syndicate multidisciplinary materials before
          go forward benefits. Intrinsicly syndicate an expanded array of
          processes and cross-unit partnerships.
        </div>
        <div class="bottom__text">
          Objectively transition extensive data rather than cross functional
          solutions. Monotonectally syndicate multidisciplinary materials before
          go forward benefits. Intrinsicly syndicate an expanded array of
          processes and cross-unit partnerships.
        </div>
      </div>
    </div>
    <div class="company">
      <h2 class="style__pink">Company</h2>
      <div class="column__company">
        <router-link
          :to="{ name: 'CheckOut' }"
          class="company__style"
          v-for="desc in description"
          :key="desc"
        >
          {{ desc }}
        </router-link>
      </div>
    </div>
    <div class="information">
      <h2 class="style__pink">Information</h2>
      <div class="column__company">
        <router-link
          :to="{ name: 'CheckOut' }"
          class="company__style"
          v-for="condition in conditions"
          :key="condition"
        >
          {{ condition }}
        </router-link>
      </div>
    </div>
    <div class="Shop">
      <h2 class="style__pink">Shop Category</h2>
      <div class="column__company">
        <router-link
          :to="{ name: 'ProductPage' }"
          v-for="people in peoples"
          :key="people"
          class="company__style"
          >{{ people }}</router-link
        >
      </div>
    </div>
  </div>
  <footer>
    <div class="bottom__line center">
      <div class="year">
        &copy;{{ new Date().getFullYear() }} Brand All Rights Reserved.
      </div>
      <a href="https://github.com/Mediumgr" target="blank" class="flex">
        <span class="myName">Ruslan Guseinov</span>
        <img src="@/assets/img/github.jpg" alt="github" class="github" />
      </a>
      <nav class="icons">
        <a v-for="(link, index) in links" :key="link"
          ><i :class="['fab', links[index]]"></i
        ></a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      activeClass: 0,
      renderComponent: 0,
      links: [
        "fa-facebook-f",
        "fa-twitter",
        "fa-linkedin-in",
        "fa-pinterest-p",
        "fa-google-plus-g",
      ],
      peoples: ["Men", "Women", "Child", "Apparel", "Browse All"],
      description: ["Home", "Shop", "About", "How It works", "Contact"],
      conditions: [
        "Tearms and Condition",
        "Privacy Policy",
        "How to Buy",
        "How to Sell",
        "Promotion",
      ],
      persons: [
        {
          id: 0,
          text: "Vestibulum quis porttitor dui! Quisque viverra nunc mi, apulvinar purus condlmentum a. Aliquam condimentum mattis neque sed pretium",
          name: "Ramchik",
          location: "Sochi, Russia",
          src: "ram.jpg",
          active: true,
        },
        {
          id: 1,
          text: "A modern online store with good selection of bona pro omnigustu. Magistratus urbani et consultores responsivi qui plus semel ad exemplar electionis adiuverunt. Gratias tibi!",
          name: "Victor",
          location: "Saint-Petersburg, Russia",
          src: "dim.jpg",
          active: false,
        },
        {
          id: 2,
          text: "Amplis, a. Egregia qualitas. Cogitatio in singulis. Promotiones valde utiles. Baculi attentio et voluntas ad vota etpetitiones. Lorem aliquot annos fui. Bene vale et faustum nobis gaudium.",
          name: "Ruslan",
          location: "Moscow, Russia",
          src: "rus.jpg",
          active: false,
        },
      ],
      userEmail: "",
      email: /^[\w.-]+@\w+\.[a-z]{2,4}$/i,
      correctEmail: "",
      error: "Enter correct email: *****@*** . **",
      success: "Your e-mail has been added to database",
      percent: "",
    };
  },
  methods: {
    checkEmail() {
      this.correctEmail = this.email.test(this.userEmail);
    },
  },
  computed: {
    active() {
      return `linear-gradient(90deg, #f16d7f ${parseInt(
        this.percent
      )}%, rgb(214, 214, 214) ${parseInt(this.percent)}%)`;
    },
  },
  watch: {
    activeClass(newValue) {
      switch (newValue) {
        case 1:
          setTimeout(() => {
            this.persons.map((person) => {
              person.active = false;
            });
            this.persons[newValue].active = true;
            this.renderComponent += 1;
            this.activeClass = 2;
          }, 3000);

          for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
              this.percent = i;
              this.$refs.bar[0].style.background = this.active;
            }, (i * 3000) / 100);
          }
          break;
        case 2:
          setTimeout(() => {
            this.persons.map((person) => {
              person.active = false;
            });
            this.persons[newValue].active = true;
            this.renderComponent += 1;
            this.activeClass = 0;
          }, 3000);

          for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
              this.percent = i;
              this.$refs.bar[1].style.background = this.active;
            }, (i * 3000) / 100);
          }
          break;
        case 0:
          setTimeout(() => {
            this.persons.map((person) => {
              person.active = false;
            });
            this.persons[newValue].active = true;
            this.renderComponent += 1;
            this.$refs.bar[0].style.background = "";
            this.$refs.bar[1].style.background = "";
            this.$refs.bar[2].style.background = "";
            this.activeClass = 1;
          }, 3001);

          for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
              this.percent = i;
              this.$refs.bar[2].style.background = this.active;
            }, (i * 3000) / 100);
          }
          break;
      }
    },
  },
  created() {
    this.activeClass = 1;
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}
.subscribeInfo {
  padding-top: 37px;
  padding-right: 80px;
}

.newletter {
  padding-bottom: 37px;
}

.img {
  border-radius: 50%;
}

.personActive,
.flex {
  display: flex;
}

.myName {
  color: white;
  font-size: 17px;
  font-weight: 700;
}

.github {
  padding-left: 8px;
  width: 19px;
  height: 19px;
}
</style>
