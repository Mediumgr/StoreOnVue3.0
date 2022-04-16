<template>
  <div class="login">
    <label class="label">{{ label }}</label>
    <input :value="modelValue" @change="updateValue" v-bind="$attrs" />
    {{ modelValue }}
    <button class="button" @click="submit">login</button>
  </div>
</template>

<script>
/* import firebase from "firebase/compat/app"; */

export default {
  emits: ["update: modelValue"],
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
  methods: {
    updateValue(event) {
      console.log(event.target.value);
      let value = event.target.value;
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      this.$emit("update: modelValue", value);
    },
    async submit() {
      console.log("Submit", this.modelValue);
      /*       await firebase.database().ref(`/users/orders`).push("Имя"); */
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.label {
  margin: 0 auto;
}
.button {
  width: 70px;
  height: 20px;
  margin: 0 auto;
  background-color: rgb(70, 214, 106);
  color: white;
  margin-bottom: 5px;
}
</style>
