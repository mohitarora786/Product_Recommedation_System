<template>
  <div class="row q-mt-sm">
    <q-expansion-item
      v-model="expanded"
      class="expander col-sm-5 col-xs-12 sticky-question"
      :class="{
        'dark-page-color dark-theme-border': productStore.darkTheme,
        'bg-white': !productStore.darkTheme,
      }"
      :label="
        newStickyQuestion ? label() : ''
      "
      v-if="productStore.firstQuestionAskedOrNot != 6"
    >
      <div
        class="col-sm-5 text-center col-xs-12 q-px-md"
        v-if="productStore.firstQuestionAskedOrNot == 0"
      >
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <questions-component
              Question="Are you looking for earbuds or headphones?"
              :Options="[
                { name: 'Earbuds', value: 'Earbud' },
                { name: 'Headphones', value: 'Headphone' },
                { name: 'Both', value: 'Earbud,Headphone' },
              ]"
              SubQuestion="Help Me Decide"
            />
            <div class="text-right q-mt-md q-mr-md">
              <div class="text-subtitle1" v-if="productStore.storeLoader">
                Products are loading...
              </div>
              <q-btn
                size="12px"
                icon-right="double_arrow"
                outline
                class="text-uppercase q-px-lg sticky-next-or-back"
                @click="skipbutton()"
                v-else
              >
                Next
              </q-btn>
            </div>
            <div
              class="font-primary text-negative q-ma-md text-subtitle1"
              v-if="productStore.warningMsg"
            >
              Please select an option to continue
            </div>
          </div>
        </div>
        <div v-if="productStore.firstQuestionAskedOrNot <= 5">
          <price-filter-component />
        </div>
      </div>

      <div
        class="col-sm-5 text-center col-xs-12 q-px-md"
        v-if="productStore.firstQuestionAskedOrNot == 1"
      >
        <div class="text-center">
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <questions-component
                Question="Would you rather have a wired or wireless product?"
                :Options="[
                  { name: 'Wireless', value: 'WirelessConnectivity' },
                  { name: 'Wired', value: 'WiredConnectivity' },
                  {
                    name: 'Both',
                    value: 'WiredConnectivity,WirelessConnectivity',
                  },
                ]"
                SubQuestion="Help Me Decide"
              />
              <skip-and-back-button />
            </div>
          </div>
        </div>
        <div v-if="productStore.firstQuestionAskedOrNot <= 5">
          <price-filter-component />
        </div>
      </div>
      <div
        class="col-sm-5 text-center col-xs-12 q-px-md"
        v-else-if="productStore.firstQuestionAskedOrNot == 2"
      >
        <div class="text-center">
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <questions-component
                Question="Is it important to fit small ears ?"
                :Options="[
                  { name: 'Yes it is must', value: 'must' },
                  { name: 'Yes, but show me other options', value: 'bonus' },
                  { name: 'Not Important', value: 'no' },
                ]"
                SubQuestion="Why do we ask this?"
                PopUpMsg="This question helps in recommending earbuds that are specifically designed to address challenges finding earbuds that fit properly, ensuring better comfort, fit, and audio performance."
                PopUpHeading="Small Ears or Not"
              />
              <skip-and-back-button />
            </div>
          </div>
        </div>
        <div v-if="productStore.firstQuestionAskedOrNot <= 5">
          <price-filter-component />
        </div>
      </div>
      <div
        class="col-sm-5 text-center col-xs-12 q-px-md"
        v-else-if="productStore.firstQuestionAskedOrNot == 3"
      >
        <div class="text-center">
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <questions-component
                Question="What device do you have?"
                :Options="[
                  { name: 'iPhone', value: 'iPhone' },
                  { name: 'Android', value: 'Android' },
                  { name: 'Samsung', value: 'Samsung' },
                ]"
                SubQuestion="Help Me Decide"
              />
              <skip-and-back-button />
            </div>
          </div>
        </div>
        <div v-if="productStore.firstQuestionAskedOrNot <= 5">
          <price-filter-component />
        </div>
      </div>
      <div
        class="col-sm-5 text-center col-xs-12 q-px-md"
        v-else-if="productStore.firstQuestionAskedOrNot == 4"
      >
        <div class="text-center">
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <checkbox-question
                Question="For what activities will you use the product?"
                SubQuestion="(Choose up to 2 for best results)"
              />
            </div>
          </div>
        </div>
        <div v-if="productStore.firstQuestionAskedOrNot <= 5">
          <price-filter-component />
        </div>
      </div>
      <div
        class="col-sm-5 text-center col-xs-12 q-px-md"
        v-else-if="productStore.firstQuestionAskedOrNot == 5"
      >
        <div class="text-center">
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <product-priority-component
                Question="Select up to 2 of the most important features you need for your product."
                :PriorityList="[
                  { name: 'Active Noice Canceling', id: 0 },
                  { name: 'Microphone', id: 1 },
                  { name: 'Battery Life', id: 2 },
                  { name: 'Sound Quality', id: 3 },
                ]"
                SubQuestion="Help me how ?"
              />
            </div>
          </div>
        </div>
        <div v-if="productStore.firstQuestionAskedOrNot <= 5">
          <price-filter-component />
        </div>
      </div>
    </q-expansion-item>

    <div class="col-sm-7 overflow-hidden col-xs-12">
      <span class="">
        <div
          v-for="(product, index) in topThreeProducts(
            productStore.productDetails[productStore.firstQuestionAskedOrNot]
          )"
        >
          <product-component
            v-if="productStore.firstQuestionAskedOrNot == 0"
            :Productdetails="product"
            :index="index"
          />
        </div>
        <div
          v-for="(product, index) in topThreeProducts(
            productStore.productDetails[productStore.firstQuestionAskedOrNot]
          )"
        >
          <product-component
            v-if="productStore.firstQuestionAskedOrNot == 1"
            :Productdetails="product"
            :index="index"
          />
        </div>
        <div
          v-for="(product, index) in topThreeProducts(
            productStore.productDetails[productStore.firstQuestionAskedOrNot]
          )"
        >
          <product-component
            v-if="productStore.firstQuestionAskedOrNot == 2"
            :Productdetails="product"
            :index="index"
          />
        </div>
        <div
          v-for="(product, index) in topThreeProducts(
            productStore.productDetails[productStore.firstQuestionAskedOrNot]
          )"
        >
          <product-component
            v-if="productStore.firstQuestionAskedOrNot == 3"
            :Productdetails="product"
            :index="index"
          />
        </div>
        <div
          v-for="(product, index) in topThreeProducts(
            productStore.productDetails[productStore.firstQuestionAskedOrNot]
          )"
        >
          <product-component
            v-if="productStore.firstQuestionAskedOrNot == 4"
            :Productdetails="product"
            :index="index"
          />
        </div>
        <div
          v-for="(product, index) in topThreeProducts(
            productStore.productDetails[productStore.firstQuestionAskedOrNot]
          )"
        >
          <product-component
            v-if="productStore.firstQuestionAskedOrNot == 5"
            :Productdetails="product"
            :index="index"
          />
        </div>

        <div
          class="q-my-lg text-center q-px-lg"
          v-if="productStore.firstQuestionAskedOrNot == 5"
        >
          <q-btn
            size="12px"
            outline
            class="text-body2 text-uppercase full-width"
            @click="seeFullList()"
          >
            <div>See Full List</div>
          </q-btn>
        </div>
      </span>
      <div
        :class="{ blankDiv: expanded, smallBlankDiv: !expanded }"
        v-if="productStore.firstQuestionAskedOrNot != 6"
      ></div>
    </div>
  </div>
  <second-last-page v-if="productStore.firstQuestionAskedOrNot == 6"/>
  <last-page v-if="productStore.firstQuestionAskedOrNot == 7" />
</template>

<script setup lang="ts">
import { useProductStore } from "src/stores/products-store";
import QuestionsComponent from "../components/QuestionsComponent.vue";
import ProductComponent from "./ProductComponent.vue";
import SkipAndBackButton from "./SkipAndBackButton.vue";
import CheckboxQuestion from "./CheckboxQuestion.vue";
import ProductPriorityComponent from "./ProductPriorityComponent.vue";
import SecondLastPage from "./SecondLastPage.vue";
import LastPage from "./LastPage.vue";
import PriceFilterComponent from "./PriceFilterComponent.vue";
import LoaderComponent from "./LoaderComponent.vue";
import { ref, onMounted,onBeforeMount,watch } from "vue";

const productStore = useProductStore();
const expanded = ref(true);
const newStickyQuestion = ref(false);
const label = () => {
  switch (productStore.firstQuestionAskedOrNot) {
    case 0:
      return "Are you looking for earbuds or headphones?";
    case 1:
      return "Would you rather have a wired or wireless product?";
    case 2:
      return "Is it important to fit small ears ?";
    case 3:
      return "What device do you have?";
    case 4:
      return "For what activities will you use the product?";
    case 5:
      return "Select up to 2 of the most important features you need for your product.";
    default:
      return "";
  }
};
const warningMsg = ref(false);
watch(expanded, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      newStickyQuestion.value = true;
    }, 200);
  } else {
    newStickyQuestion.value = false;
  }
});
// const warningMsg = ref(false);
const skipbutton = () => {
  if (!productStore.budsOrHeadphones) {
    productStore.warningMsg = true;
  } else {
    productStore.getProducts();
  }
};
const seeFullList = () => {
  //Assigning value of priority question to last page
  productStore.productDetails[productStore.firstQuestionAskedOrNot].forEach((item) => {
    delete item.animation;
  });
  productStore.productDetails[productStore.firstQuestionAskedOrNot+1]=productStore.productDetails[productStore.firstQuestionAskedOrNot];
  productStore.firstQuestionAskedOrNot = 6;
  console.log('productStore.productDetails: ', productStore.productDetails);
};

onBeforeMount(() => {
  productStore.topFiveProducts();
});

const topThreeProducts = (products: any) => {
  if (products) {
    return products.slice(0, 3);
  } else {
    return [];
  }
};
</script>
