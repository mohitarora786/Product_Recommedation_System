<template>
  <div class="text-h5 q-mt-sm q-mb-sm font-primary">
    <p class="text-h5 text-weight-bold">{{ props.Question }}</p>
  </div>
  <div class="">
    <div class="row q-ml-none">
      <div class="row">
        <div v-for="element in priorityList" class="col-md-12 q-py-sm col-sm-12 col-xs-12">
            <div class="q-px-md">
              <q-btn
                class="full-width sticky-questions"
                outline
                color="secondary"
                size="18px"
                :class="{ 'bg-secondary text-white': element.value }"
                @click="selectedProductPriority(element)"
              >
                <q-icon
                  name="headset"
                  color="secondary"
                  class="q-mr-sm"
                  :class="{ 'text-white': element.value }"
                  size="20px"
                  v-if="element.id == 0"
                />
                <q-icon
                  name="mic"
                  color="secondary"
                  class="q-mr-sm"
                  :class="{ 'text-white': element.value }"
                  size="20px"
                  v-if="element.id == 1"
                />
                <q-icon
                  name="phone"
                  color="secondary"
                  class="q-mr-sm"
                  :class="{ 'text-white': element.value }"
                  size="20px"
                  v-if="element.id == 2"
                />
                <q-icon
                  name="music_note"
                  color="secondary"
                  class="q-mr-sm"
                  :class="{ 'text-white': element.value }"
                  size="20px"
                  v-if="element.id == 3"
                />
                {{ element.name }}
              </q-btn>
            </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- </template>
      </draggable> -->
    </div>
  </div>
  <div class="container q-px-md">
    <div class="q-mt-md">
      <q-btn
        size="12px"
        outline
        class="text-uppercase sticky-next-or-back"
        @click="backbutton()"
      >
        <q-icon name="keyboard_double_arrow_left" />
        <div>Back</div>
      </q-btn>
    </div>
    <div
      class="font-primary text-negative q-ma-md text-subtitle1"
      v-if="priorityErrorMsg"
    >
      You've selected already two features. Deselect one of them.
    </div>
  </div>
  <!-- {{ list }} -->
</template>
<script setup lang="ts">
import { useProductStore } from "src/stores/products-store";
import { ref, computed, reactive, watch } from "vue";
// import draggable from "vuedraggable";

const priorityErrorMsg = ref(false);

const dragging = ref(false);
const productStore = useProductStore();
const props = defineProps(["PriorityList", "Question", "SubQuestion"]);
// const priorityList = computed(() => props.PriorityList);
const priorityList = ref([
  reactive({
    name: "Active Noice Canceling",
    value: false,
    apiName: "ANC_Score",
    id: 0,
  }),
  reactive({
    name: "Microphone",
    value: false,
    apiName: "microphoneScore",
    id: 1,
  }),
  reactive({
    name: "Battery Life",
    value: false,
    apiName: "batteryLifeScore",
    id: 2,
  }),
  reactive({
    name: "Sound Quality",
    value: false,
    apiName: "soundQualityScore",
    id: 3,
  }),
]);

const selectedProductPriority = (selected: any) => {
  const trueCount = priorityList.value.reduce(
    (count, element) => count + (element.value ? 1 : 0),
    0
  );
  if (trueCount >= 2 && !selected.value) {
    priorityErrorMsg.value = true;
    return;
  }
  priorityErrorMsg.value = false;
  selected.value = !selected.value;
  const trueValues = priorityList.value.filter((element) => element.value === true);
  filterProductByPriority(trueValues);
  //Apply animation after filtering
  setTimeout(() => {
    applyAnimation();
  }, 1);
};

const filterProductByPriority = (priority) => {
  // console.log(priority[i]);
  productStore.oldProducts = [
    ...productStore.productDetails[productStore.firstQuestionAskedOrNot],
  ];
  //Delete the animation property from all the products so that we can add new or previous animation to it
  productStore.productDetails[productStore.firstQuestionAskedOrNot].forEach((item) => {
    delete item.animation;
  });
  productStore.newProducts = [...productStore.productDetails[productStore.firstQuestionAskedOrNot]]
  if (priority.length == 2) {
    const feature1 = priority[0].apiName;
    const feature2 = priority[1].apiName;
    // console.log(feature1, feature2);
    productStore.newProducts.sort((a, b) => {
      const threshold = 0.5;
      let aFeature1 = 0;
      let bFeature1 = 0;
      let aFeature2 = 0;
      let bFeature2 = 0;

      if (a[feature1]) {
        aFeature1 = parseFloat(a[feature1]["value"]);
      }
      if (b[feature1]) {
        bFeature1 = parseFloat(b[feature1]["value"]);
      }
      if (a[feature2]) {
        aFeature2 = parseFloat(a[feature2]["value"]);
      }
      if (b[feature2]) {
        bFeature2 = parseFloat(b[feature2]["value"]);
      }

      const finalScoreA = parseFloat(a["finalScore"]["value"]);
      const finalScoreB = parseFloat(b["finalScore"]["value"]);

      let diff = finalScoreB - finalScoreA;
      if (Math.abs(diff) > threshold) return diff;

      diff = bFeature1 - aFeature1;
      if (Math.abs(diff) > threshold) return diff;

      return bFeature2 - aFeature2;
    });
  } else if (priority.length == 1) {
    const feature1 = priority[0].apiName;
    const feature2 = priority[0].apiName;
    // console.log(feature1, feature2);
    productStore.newProducts.sort((a, b) => {
      const threshold = 0.5;
      let aFeature1 = 0;
      let bFeature1 = 0;
      let aFeature2 = 0;
      let bFeature2 = 0;

      if (a[feature1]) {
        aFeature1 = parseFloat(a[feature1]["value"]);
      }
      if (b[feature1]) {
        bFeature1 = parseFloat(b[feature1]["value"]);
      }
      if (a[feature2]) {
        aFeature2 = parseFloat(a[feature2]["value"]);
      }
      if (b[feature2]) {
        bFeature2 = parseFloat(b[feature2]["value"]);
      }

      const finalScoreA = parseFloat(a["finalScore"]["value"]);
      const finalScoreB = parseFloat(b["finalScore"]["value"]);

      let diff = finalScoreB - finalScoreA;
      if (Math.abs(diff) > threshold) return diff;

      diff = bFeature1 - aFeature1;
      if (Math.abs(diff) > threshold) return diff;

      return bFeature2 - aFeature2;
    });
  } else {
    productStore.newProducts.sort((a, b) => {
      return parseFloat(b.finalScore.value) - parseFloat(a.finalScore.value);
    });
    // console.log("No priority");
  }
};

const applyAnimation = () => {
  for (let i = 0; i < 3; i++) {
    //If all top three products are same as before
    if (
      productStore.newProducts[i].name.value ==
      productStore.oldProducts[i].name.value
    ) {
      productStore.newProducts[i].animation = {
        value: "slidezigzag",
      };
    } 
    //If products are same but their positions are different or products are totally different
    else if (
      productStore.newProducts[i].name.value !=
      productStore.oldProducts[i].name.value
    ) {
      // console.log("Not equal");
      for (let j = 0; j < 3; j++) {
        //If products are same but their positions are different
        if (
          productStore.newProducts[i].name
            .value == productStore.oldProducts[j].name.value
        ) {
          if (i > j) {
            productStore.newProducts[
              i
            ].animation = { value: "slideDown" };
          } else if (i < j) {
            productStore.newProducts[
              i
            ].animation = { value: "slideUp" };
          }
        }
        //If products are totally different 
        else if (
          productStore.newProducts[i].name
            .value != productStore.oldProducts[j].name.value
        ) {
          if (
            !productStore.newProducts[i]
              .animation
          ) {
            productStore.newProducts[
              i
            ].animation = { value: "slideIn" };
          }
        }
      }
    }
  }
  productStore.productDetails[productStore.firstQuestionAskedOrNot] = productStore.newProducts
  // console.log('newProducts: ', productStore.productDetails[productStore.firstQuestionAskedOrNot]);
};

const backbutton = () => {
  productStore.firstQuestionAskedOrNot -= 1;
};
</script>
