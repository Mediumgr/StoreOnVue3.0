<template>
  <div class="relativeAccount">
    <div class="account">
      <button
        class="clickOnAccount"
        @click.stop="clickOnAccount"
        v-if="currentRow === 'down'"
      >
        My Account <i class="fas fa-caret-down caret-down" />
      </button>
      <button class="clickOnAccount" @click.stop="clickOnAccount" v-else>
        My Account <i class="fas fa-caret-up caret-up" />
      </button>
    </div>
    <div class="absolutLogin">
      <login-input
        v-if="currentRow === 'up'"
        type="text"
        placeholder="name"
        class="loginInput"
        label="Type your name:"
        v-model.capitalize="name"
        @changeClass="changeClass"
      ></login-input>
    </div>
  </div>
</template>

<script>
import LoginInput from "@/components/Header/LoginInput.vue";

export default {
  name: "MyAccount",
  components: {
    LoginInput,
  },
  data() {
    return {
      currentRow: "down",
      name: "",
    };
  },
  methods: {
    clickOnAccount() {
      this.currentRow === "down"
        ? (this.currentRow = "up")
        : (this.currentRow = "down");
    },
    changeClass() {
      this.currentRow = "down";
    },
  },
};
</script>

<style lang="scss">
.loginInput {
  padding: 0 10px;
  height: 20px;
  margin: 10px;
  border: 1px solid #f16d7f;
}
.relativeAccount {
  position: relative;
}
.absolutLogin {
  position: absolute;
  margin-top: 2px;
  background: #fcbbc4;
}
</style>
