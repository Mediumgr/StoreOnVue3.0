<template>
  <input
    type="checkbox"
    :checked="modelValue"
    :id="label"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit('update:modelValue', $event.target.checked);
        $emit('filterOnSizes', $event.target.id);
      },
    }"
  />
  <label :for="label" :class="classObject" v-if="label">{{ label }}</label>
</template>

<script>
export default {
  data() {
    return {
      classObject: {
        your__size: true,
        your__size_XXL: this.label === "XXl",
      },
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
