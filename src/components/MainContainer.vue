<template>
  <div class="container" v-if="!componentActive">
    <div
      class="column items-center q-gutter-xl pb-12 h-full justify-center sm:justify-start pt-0"
    >
      <div class="overflow-hidden flex sm:mt-0 sm:mx-0 mx-3 justify-center">
        <transition appear enter-active-class="animated fadeInDown repeat">
          <img
            alt="earbuds"
            src="~assets/earbuds.png"
            :style="{ transform: 'translateY(' + translateY1 + '%)' }"
          />
        </transition>
      </div>
      <div class="column q-gutter-lg mx-auto">
        <div class="overflow-hidden">
          <transition appear enter-active-class="animated fadeIn slower delay-1s">
          <div class="flex row q-gutter-sm" :style="{ transform: 'translateY(' + translateY1 + '%)' }">
            <electric-svg />
            <div>
              <span class="text-h5 text-weight-medium">
                Save time, save money, get the right product
              </span>
              <div class="text-gray-500">
                We combine deep research with what matters to you.
              </div>
            </div>
          </div>
        </transition>
        </div>
        <transition appear enter-active-class="animated fadeIn slower delay-2s">
          <div class="overflow-hidden">
            <div class="flex row q-gutter-sm" :style="{ transform: 'translateY(' + translateY1 + '%)' }">
              <dollar-svg />
              <div>
                <span class="text-h5 text-weight-medium">
                  We're 100% independent
                </span>
                <div class="text-gray-500">
                  We don't earn commissions and we don't pressure you to buy.
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div
        class="mt-5 sm:mt-0 tallNarrow:fixed tallNarrow:bottom-0 tallNarrow:left-0 tallNarrow:w-full tallNarrow:pb-4"
        :style="{ transform: 'translateY(' + translateY1 + '%)' }">
        <button
          @click="getstarted"
          class="flex justify-center items-center bg-secondary no-border text-white font-semibold text-h5 q-px-lg q-py-lg font-sans rounded-xl q-mb-lg cursor-pointer"
          size="xl"
        >
          Get Started
          <right-arrow-svg class="q-ml-sm"/>
        </button>
      </div>
    </div>
  </div>
  <QuizContent v-else/>
</template>
<script setup lang="ts">
import { ref } from "vue";
import QuizContent from "../components/QuizContent.vue";
import DollarSvg from "../components/svg/DollarSvg.vue";
import ElectricSvg from "../components/svg/ElectricSvg.vue";
import RightArrowSvg from "../components/svg/RightArrowSvg.vue";

const componentActive = ref(false);

const translateY1 = ref(0);
function getstarted() {
  function increaseTranslateY() {
    if (translateY1.value < 350) {
      setTimeout(() => {
        translateY1.value+=4;
        increaseTranslateY();
      }, 1); // Adjust the delay as needed
    } else {
      componentActive.value = true;
    }
  }

  increaseTranslateY();
}

</script>
<style>

</style>
