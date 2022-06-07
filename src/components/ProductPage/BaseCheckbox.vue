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
  <label :for="label" class="your__size" v-if="label">{{ label }}</label>
</template>

<script>
export default {
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
