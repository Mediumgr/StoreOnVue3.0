<template>
  <div :class="classObject">
    <label class="label">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="updateValue($event)"
      v-bind="$attrs"
      @keyup.enter="submit"
    />
    <button class="button" @click.stop="submit">login</button>
  </div>
  <div v-if="flashMessage" class="flash">
    {{ flashMessage
    }}<i
      class="fa-solid fa-arrow-right-from-bracket logout"
      :class="none"
      @click="logOut"
    ></i>
  </div>
</template>

<script>
/* import firebase from "firebase/compat/app"; */

export default {
  inheritAttrs: false,
  emits: ["update:modelValue", "changeClass"],
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: String,
    modelModifiers: {
      default: () => ({}),
    },
  },
  data() {
    return {
      flashMessage: "",
      classObject: {
        login: true,
        unLogin: false,
      },
      none: false,
    };
  },
  methods: {
    updateValue(event) {
      if (this.modelModifiers.capitalize) {
        let value =
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1);
        this.$emit("update:modelValue", value);
      }
    },
    submit() {
      this.flashMessage = `You are logged in as ${this.modelValue}`;
      localStorage.setItem("Login", JSON.stringify(`${this.modelValue}`));
      this.$store.commit("USER", this.modelValue);
      this.classObject.unLogin = true;
      this.classObject.login = false;
      /*       await firebase.database().ref(`/users/orders`).push("Имя"); */
    },
    logOut() {
      let answer = window.confirm("Do you really want to logout ?");
      if (answer) {
        localStorage.clear();
        this.flashMessage = "";
        this.$store.commit("USER", null);
        this.none = true;
        this.$emit("changeClass");
      }
    },
  },
  created() {
    if (localStorage.getItem("Login")) {
      this.flashMessage =
        "You are logged in as " + JSON.parse(localStorage.getItem("Login"));
      this.classObject.unLogin = true;
      this.classObject.login = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.logout {
  padding-left: 5px;
  cursor: pointer;
}
.unLogin {
  display: none;
}
.none {
  display: none;
}
.label {
  margin: 0 auto;
  color: white;
}
.button {
  width: 70px;
  height: 25px;
  margin: 0 auto;
  background-color: rgb(70, 214, 106);
  color: white;
  margin-bottom: 5px;
  border: none;
}
.flash {
  font-size: 12px;
  width: 143px;
  font-weight: 500;
  text-align: center;
  padding-top: 3px;
}
</style>
