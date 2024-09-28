<template>
  <div class="container">
    <transition appear enter-active-class="animated fadeInUp repeat">
      <p class="text-center q-my-xl text-primary" v-if="productStore.firstQuestionAskedOrNot != 6">
        <p class="text-center text-h4 q-ma-xl text-primary text-weight-bold" v-if="productStore.firstQuestionAskedOrNot == 0">
        Top earbuds and headphones: discover your perfect match from our list of 300 products
        </p>
        <span class="q-my-md text-h4" v-else>
          Find the best Earbuds or Headphones for you
        </span>
      </p>
      <div class="text-center text-h4 q-my-xl" v-else>
        Here are the top products we recommend based on your answers
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { useProductStore } from 'src/stores/products-store';
const productStore = useProductStore();
</script>
