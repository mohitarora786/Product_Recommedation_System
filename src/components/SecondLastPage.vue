<template>
  <div class="container">
    <div
      class="column items-center q-gutter-lg justify-center sm:justify-start"
    >
      <div
        class="overflow-hidden flex sm:mt-0 sm:mx-0 mx-3 justify-center text-h4 text-weight-medium"
      >
        Your recommendations are ready!
      </div>
      <div class="column q-gutter-lg mx-auto">
        <div class="overflow-hidden">
          <div class="text-h5 q-mb-md font-sans">Next, you'll see:</div>
          <div class="flex row q-gutter-sm">
            <prize-svg />
            <div>
              <span class="text-subtitle1 font-sans">
                Our top picks for you and why we picked them
              </span>

            </div>
          </div>
        </div>
        <div class="overflow-hidden">
          <div class="flex row q-gutter-sm">
            <double-arrow-svg />
            <div>
              <span class="text-subtitle1 font-sans">
                Detailed comparisons with other options
              </span>
            </div>
          </div>
        </div>
        <div class="overflow-hidden">
          <div class="flex row q-gutter-sm">
            <card-svg />
            <div>
              <span class="text-subtitle1 font-sans">
                Links to buy if you're ready. No commissions
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-5 sm:mt-0 tallNarrow:fixed tallNarrow:bottom-0 tallNarrow:left-0 tallNarrow:w-full tallNarrow:pb-4"
      >
        <button
          class="flex justify-center bg-blue-600 hover:bg-blue-700 border-blue-600 border text-white text-h5 q-px-lg q-py-lg font-sans rounded-xl cursor-pointer text-weight-medium"
          size="xl"
          color="primary"
          @click="seeMyRecommendations()"
        >
          See my recommendations
          <right-arrow-svg class="q-ml-sm"/>
        </button>
      </div>
      <q-btn
        size="12px"
        outline
        color="accent"
        class="text-body2 text-uppercase q-px-xl"
        @click="backbutton()"
      >
        <q-icon name="keyboard_double_arrow_left" />
        <div>Back</div>
      </q-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import PrizeSvg from "../components/svg/PrizeSvg.vue";
import DoubleArrowSvg from "../components/svg/DoubleArrowSvg.vue";
import CardSvg from "../components/svg/CardSvg.vue";
import RightArrowSvg from "../components/svg/RightArrowSvg.vue";
import { useProductStore } from "src/stores/products-store";
const productStore = useProductStore();

const seeMyRecommendations = () => {
  productStore.productDetails[productStore.firstQuestionAskedOrNot].forEach((item) => {
    delete item.animation;
  });
  productStore.productDetails[productStore.firstQuestionAskedOrNot+1]=productStore.productDetails[productStore.firstQuestionAskedOrNot];
  productStore.firstQuestionAskedOrNot = 7;
}
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
