<template>
  <div class="order__first">
    <div class="rebox__img">
      <img
        :src="require(`@/assets/img/${cartItem.img}`)"
        alt="your product"
        class="rebox__img_photo"
      />
    </div>
    <div class="flex__name__product">
      <span class="rebox__text">{{ cartItem.name }}</span>
      <div>
        <i v-for="n in 5" :key="n" class="fas fa-star fa-sm star"></i>
      </div>
      <div class="price__for__order">
        {{ cartItem.quantity }} {{ cartItem.name }}:
        {{ cartItem.quantity * cartItem.price }}&#36;
      </div>
    </div>
    <div class="cross" @click="$emit('remove', cartItem)">
      <i class="fas fa-times-circle cross-circle"></i>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["remove"],
  props: {
    cartItem: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
