<template>
  <div class="mochino">Moschino Cheap And Chic</div>
  <div class="star">
    <img :src="require('@/assets/img/star.png')" alt="stars" />
  </div>
  <div class="text__product">
    {{ women.description }}
    <div class="material__designer">
      <div class="material">
        MATERIAL:<span class="common__style"> COTTON</span>
      </div>
      <div class="designer">
        DESIGNER:<span class="common__style"> {{ women.designer }}</span>
      </div>
    </div>
  </div>
  <div class="amount__total">{{ women.price }} &#36;</div>
</template>

<script>
export default {
  props: {
    women: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
