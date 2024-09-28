<template>
  <div class="row">
    <div class="row q-col-gutter-md q-pl-xl justify-center full-width">
      <div
        class="col-6"
        v-for="(product, index) in topThreeProducts(
          productStore.productDetails[productStore.firstQuestionAskedOrNot]
        )"
      >
        <product-component :Productdetails="product" :index="index" />
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-10 text-center text-h4 q-my-xl q-mx-auto">
      Other products fitting your needs
    </div>
    <div class="row q-col-gutter-md q-ml-xl">
      <div
        class="col-6"
        v-for="(product, index) in allProducts(productStore.productDetails[productStore.firstQuestionAskedOrNot])"
      >
        <product-component :Productdetails="product" :index="index+3" />
      </div>
    </div>
  </div>
  <div class="flex justify-center q-my-lg">
    <q-btn
      size="12px"
      color="accent"
      outline
      class="text-body2 text-uppercase q-px-xl"
      @click="backbutton()"
    >
      <q-icon name="keyboard_double_arrow_left" />
      <div>Back</div>
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { useProductStore } from "src/stores/products-store";
import ProductComponent from "./ProductComponent.vue";
const productStore = useProductStore();
const topThreeProducts = (products: any) => products.slice(0, 3);
const allProducts = (products: any) => products.slice(3, 15);
const backbutton = () => {
  productStore.firstQuestionAskedOrNot -= 1;
};
</script>
