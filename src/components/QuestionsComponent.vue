<template>
  <transition appear enter-active-class="animated fadeInUp repeat">
    <div class="text-h5 q-mt-md q-mb-sm font-primary text-primary">
      <p class="text-h5 text-weight-bold">{{ props.Question }}</p>
    </div>
  </transition>
  <transition appear enter-active-class="animated fadeInUp repeat">
    <div
      class="text-subtitle1 font-primary text-weight-medium text-secondary q-mb-lg cursor-pointer"
      @click="showPopUpMsg()"
    >
      {{ props.SubQuestion }}
    </div>
  </transition>
  <div class="">
    <div class="row">
      <div
        class="col-md-12 col-sm-12 col-xs-12 q-mb-md q-px-md"
        v-for="Option in props.Options"
        v-if="productStore.firstQuestionAskedOrNot == 0"
      >
        <transition appear enter-active-class="animated fadeInUp repeat">
          <q-btn
            outline 
            color="secondary"
            class="full-width sticky-questions"
            :class="{
              active:
                Option.value === productStore.budsOrHeadphones ||
                Option.value === productStore.wiredOrWireless ||
                Option.value === productStore.deviceType ||
                Option.value === productStore.fitOnSmallEar,
            }"
            size="18px"
            @click="budsOrHeadphones(Option.value)"
          >
            {{ Option.name }}
          </q-btn>
        </transition>
      </div>
      <div class="col-md-12 col-sm-12 col-xs-12 q-mb-md q-px-md" v-for="Option in props.Options" v-else>
        <transition appear enter-active-class="animated fadeInUp repeat">
          <q-btn
            outline 
            color="secondary"
            class="full-width sticky-questions"
            :class="{
              active:
                Option.value === productStore.budsOrHeadphones ||
                Option.value === productStore.wiredOrWireless ||
                Option.value === productStore.deviceType ||
                Option.value === productStore.fitOnSmallEar,
            }"
            size="18px"
            @click="budsOrHeadphones(Option.value)"
          >
            {{ Option.name }}
          </q-btn>
        </transition>
      </div>
    </div>
    <div v-for="Checkbox in props.Checkbox">
      {{ Checkbox }}
    </div>
  </div>

  <q-dialog v-model="viewSpecifications">
    <q-card style="width: 425px; max-width: 70vw;">
      <q-card-section class="row items-center q-px-sm q-pt-sm q-pb-none">
        <div class="text-h6"></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup size="sm"/>
      </q-card-section>
      <q-card-section class="q-pt-none column">
        <h6 class="q-mt-none q-mb-md text-weight-bold">
          {{ props.PopUpHeading }}
        </h6>
        <div class="q-mb-md">
          {{ props.PopUpMsg }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useProductStore } from "src/stores/products-store";
const productStore = useProductStore();
const viewSpecifications = ref(false);
const props = defineProps([
  "Question",
  "Options",
  "Checkbox",
  "SubQuestion",
  "PopUpMsg",
  "PopUpHeading",
]);
const right = ref(false);

const showPopUpMsg = () => {
  if (props.PopUpMsg) {
    viewSpecifications.value = true;
  }
};

const selectBudsOrHeadphones = (selected: string) => {
  productStore.budsOrHeadphones = selected;
  productStore.warningMsg = false;
};

const selectWiredOrWireless = (selected: string) => {
  productStore.wiredOrWireless = selected;
};

const selectFitOnSmallEar = (selected: string) => {
  if (selected === "must" || selected === "bonus" || selected === "no") {
    productStore.fitOnSmallEar = selected;
  } else {
    productStore.fitOnSmallEar = "";
  }
};

const selectDeviceType = (selected: string) => {
  productStore.deviceType = selected;
};

const budsOrHeadphones = (selected: string) => {
  if (productStore.firstQuestionAskedOrNot === 0) {
    selectBudsOrHeadphones(selected);
  }
  if (productStore.firstQuestionAskedOrNot === 1) {
    selectWiredOrWireless(selected);
  }
  if (productStore.firstQuestionAskedOrNot === 2) {
    selectFitOnSmallEar(selected);
  }
  if (productStore.firstQuestionAskedOrNot === 3) {
    selectDeviceType(selected);
  }
};
</script>
