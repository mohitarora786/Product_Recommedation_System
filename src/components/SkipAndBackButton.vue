<template>
  <div class="flex justify-between q-px-md q-mt-md">
    <div class="">
      <q-btn
        size="12px"
        outline
        class="text-uppercase q-px-lg sticky-next-or-back"
        @click="backbutton()"
        :class="{ disabled: productStore.storeLoader }"
      >
        <q-icon name="keyboard_double_arrow_left" />
        <div>Back</div>
      </q-btn>
    </div>
    <div class="text-subtitle1" v-if="productStore.storeLoader">
      Products are loading...
    </div>
    <div class="" v-else>
      <q-btn
        size="12px"
        outline
        class="text-uppercase q-px-lg sticky-next-or-back"
        @click="skipbutton()"
      >
        <div>Next</div>
        <q-icon name="keyboard_double_arrow_right" />
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "src/stores/products-store";
const productStore = useProductStore();

const skipbutton = async () => {
  if (
    productStore.budsOrHeadphones == "Earbud" &&
    productStore.wiredOrWireless == "WirelessConnectivity"
  ) {
    await productStore.getProducts();
  } else if (productStore.firstQuestionAskedOrNot == 1) {
    await productStore.getProducts();
    productStore.productDetails[productStore.firstQuestionAskedOrNot + 1] =
      productStore.productDetails[productStore.firstQuestionAskedOrNot];
    productStore.firstQuestionAskedOrNot += 1;
  } else {
    await productStore.getProducts();
  }
};

const backbutton = () => {
  // Skip the third question if user does not select earbuds and wireless
  if (!productStore.storeLoader) {
    if (
      productStore.firstQuestionAskedOrNot == 3 &&
      !(
        productStore.budsOrHeadphones === "Earbud" &&
        productStore.wiredOrWireless === "WirelessConnectivity"
      )
    ) {
      productStore.firstQuestionAskedOrNot -= 2;
    } else {
      productStore.firstQuestionAskedOrNot -= 1;
    }
  }
};
</script>
