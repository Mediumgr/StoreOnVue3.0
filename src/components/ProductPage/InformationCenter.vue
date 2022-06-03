<template>
  <div class="InformationCenter center">
    <div class="blockInformationDelivery">
      <div class="truckImg">
        <img :src="require('@/assets/img/truck.png')" alt="truck" />
      </div>
      <div class="firstInfo">
        <h3 class="free freeStyle">Free Delivery</h3>
        <h4 class="delivery deliveryInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationDiscount">
      <div class="circleImg">
        <img :src="require('@/assets/img/circle.png')" alt="discount" />
      </div>
      <div class="secondInfo">
        <h3 class="sales salesStyle">Sales &amp; discounts</h3>
        <h4 class="discounts salesInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationQuality">
      <div class="crownImg">
        <img :src="require('@/assets/img/korona.png')" alt="crown" />
      </div>
      <div class="thirdInfo">
        <h3 class="quality qualityStyle">Quality assurance</h3>
        <h4 class="assurance qualityInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
