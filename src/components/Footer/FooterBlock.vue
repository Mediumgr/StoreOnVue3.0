<template>
  <div class="surfer">
    <div class="content center">
      <div>
        <div
          class="pre__bottom__block"
          v-for="person in persons"
          :key="person.id"
        >
          <div v-show="person.active" class="personActive">
            <div class="foto">
              <img :src="person.src" :alt="person.name" class="img" />
            </div>
            <div class="france">
              <h3 class="text__france">&#171;{{ person.text }}&raquo;</h3>
              <h3 class="guestName">{{ person.name }}</h3>
              <h4 class="guestLocation">{{ person.location }}</h4>
            </div>
          </div>
        </div>
        <div class="gorizontal__bar">
          <div
            class="bar"
            v-for="n in persons.length"
            :key="n"
            @click="changeGuest(n)"
            :class="{ active: activeClass === n }"
          ></div>
        </div>
      </div>
      <div>
        <div class="subscribeInfo">
          <h1 class="subscribe">Subscribe</h1>
          <h3 class="newletter">FOR OUR NEWLETTER AND PROMOTION</h3>
        </div>
        <form action="#" class="right__button">
          <input type="text" placeholder="Enter Your Email" class="email" />
          <button class="subscribe__button">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
  <div class="last__page center">
    <div class="left__side__bottom">
      <div class="bottom__logo">
        <a href="#" class="logo">
          <img
            class="logo__img"
            src="@/assets/img/logo.png"
            alt="logo"
          />BRAN<span>D</span>
        </a>
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
        <a class="company__style" v-for="desc in description" :key="desc">
          {{ desc }}
        </a>
      </div>
    </div>
    <div class="information">
      <h2 class="style__pink">Information</h2>
      <div class="column__company">
        <a
          class="company__style"
          v-for="condition in conditions"
          :key="condition"
          >{{ condition }}
        </a>
      </div>
    </div>
    <div class="Shop">
      <h2 class="style__pink">Shop Category</h2>
      <div class="column__company">
        <a class="company__style" v-for="people in peoples" :key="people">
          {{ people }}
        </a>
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
        <a><i class="fab fa-facebook-f"></i></a>
        <a><i class="fab fa-twitter"></i></a>
        <a><i class="fab fa-linkedin-in"></i></a>
        <a><i class="fab fa-pinterest-p"></i></a>
        <a><i class="fab fa-google-plus-g"></i></a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      activeClass: 1,
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
          name: "Ram",
          location: "Sochi, Russia",
          src: "https://sun1-16.userapi.com/s/v1/ig2/vAZ7cG68IyJxbHtdD35F0DkpbOvZENDwe56zlRBIsEwOQ9wOtI8z5EuXht5iSfsQpXCn7p3bn3fCS90exgH1VKRq.jpg?size=100x100&quality=95&crop=0,165,437,437&ava=1",
          active: true,
        },
        {
          id: 1,
          text: "A modern online store with good selection of bona pro omnigustu. Magistratus urbani et consultores responsivi qui plus semel ad exemplar electionis adiuverunt. Gratias tibi!",
          name: "Dmitriy",
          location: "Canada, Ottava",
          src: "https://sun1-18.userapi.com/s/v1/ig2/JAPcF5xb0kaMwuf7Suj6gIrYn3peRX3W5tC9FiML2yflv8VGxtk2OZzS4nRuBvEoGVXWo3ndsK5kBHIL-rx2X-js.jpg?size=100x100&quality=96&crop=230,396,1152,1152&ava=1",
          active: false,
        },
        {
          id: 2,
          text: "Amplis, a. Egregia qualitas. Cogitatio in singulis. Promotiones valde utiles. Baculi attentio et voluntas ad vota etpetitiones. Lorem aliquot annos fui. Bene vale et faustum nobis gaudium.",
          name: "Ruslan",
          location: "Moscow, Russia",
          src: "https://sun1-26.userapi.com/s/v1/if1/JyOEVRrrkZ3JbQsvgFx13oJOOT_pZHFZ06_sk17pde8uLywQljKWX0pklzohcXZI0RcCYCU7.jpg?size=100x100&quality=96&crop=0,484,1536,1536&ava=1",
          active: false,
        },
      ],
    };
  },
  methods: {
    changeGuest(index) {
      this.activeClass = index;
      this.persons.map((person) => {
        person.active = false;
      });
      this.persons[index - 1].active = true;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #f16d7f;
}
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
