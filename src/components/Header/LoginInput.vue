<template>
  <div class="login">
    <label class="label">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="updateValue($event)"
      v-bind="$attrs"
    />
    <button class="button" @click="submit">login</button>
  </div>
</template>

<script>
/* import firebase from "firebase/compat/app"; */

export default {
  emits: ["update:modelValue"],
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
      if (this.modelModifiers.capitalize) {
        let value =
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1);
        this.$emit("update:modelValue", value);
      }
    },
    submit() {
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
