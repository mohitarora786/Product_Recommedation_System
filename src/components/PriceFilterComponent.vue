<template>
  <div class="row q-mb-xl q-mt-lg">
    <div class="col-md-12 col-xs-12">
      <div class="text-h6 font-sans text-weight-medium">Price range</div>
      <div class="text-subtitle2 font-sans text-weight-medium">
        The average highly price is {{ calculateAverage.toFixed(2) }}$
      </div>
      <div class="row">
      <div class="col-sm-10 q-mx-auto col-xs-8">
      <div id="app">
        <div class="chart">
          <div class="bar-container" id="bar-container">
            <!-- Bars will be dynamically generated here -->
            <div
              v-for="(point, index) in productsCountInRanges"
              :key="index"
              class="bar bg-blue"
              :style="{ height: barHeight(point), left: barLeft(point) }"
            >
              <q-tooltip anchor="top middle" self="center middle">
                ${{ point.range.min.toFixed(2) }} - ${{ point.range.max.toFixed(2) }}:-
                {{ point.count }}
              </q-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="q-mb-lg">
        <q-range
          left-thumb-color="light-blue-8"
              right-thumb-color="blue-8"
              v-model="standard"
              :min="minval"
              :max="maxval"
              label-always
              track-size="10px"
              thumb-size="30px"
              switch-label-side
              :left-label-value="`${standard.min} $`"
              :right-label-value="`${standard.max} $`"
              inner-track-color="transparent"
              selection-color="transparent"
        />
      </div>
      </div>
</div>
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onBeforeMount, onMounted } from "vue";
import { useProductStore } from "src/stores/products-store";
const productStore = useProductStore();
const interval = ref(50);

const minval = computed(() => {
  const details = productStore.productDetails[productStore.firstQuestionAskedOrNot];
  if (!details || details.length === 0) {
    console.error("productDetails is undefined or empty:", details);
    return 0;
  }
  const prices = details.map((product) => parseFloat(product.price.value));
  if(Math.min(...prices)>0){
    return Math.min(...prices) - 1;
  }
  else return Math.min(...prices);
});
const maxval = computed(() => {
  const details = productStore.productDetails[productStore.firstQuestionAskedOrNot];
  if (!details || details.length === 0) {
    console.error("productDetails is undefined or empty:", details);
    return 0;
  }
  const prices = details.map((product) => parseFloat(product.price.value));
  return prices.reduce((max, current) => (current > max ? current : max), prices[0]);
});

const calculateAverage = computed(() => {
  const details = productStore.productDetails[productStore.firstQuestionAskedOrNot];
  if (!details || details.length === 0) {
    console.error("productDetails is undefined or empty:", details);
    return 0;
  }
  const numericValues = details.map((price) => parseFloat(price.price.value));
  const sum = numericValues.reduce((acc, cur) => acc + cur, 0);
  return sum / details.length;
});

const standard = ref({
  min: computed(() => productStore.priceRange.min),
  max: computed(() => productStore.priceRange.max),
});

//To update the value of price range in store
watch(standard, (newValue) => {
  productStore.priceRange.min = newValue.min;
  productStore.priceRange.max = newValue.max;
  filterProductsByPrice();
});

const barHeight = (point) => {
  return (
    ((point.count - 0) / (productStore.productDetails[productStore.firstQuestionAskedOrNot].length - 0)) * 100 * 2.5 + "%"
  );
};

const barLeft = (point) => {
  return ((point.range.min - minval.value) / (maxval.value - minval.value)) * 100 + "%";
};

const filterProductsByPrice = () => {
  productStore.filteredProducts = productStore.productDetails[
    productStore.firstQuestionAskedOrNot
  ].filter((product) => {
    return (
      product.price.value >= productStore.priceRange.min &&
      product.price.value <= productStore.priceRange.max
    );
  });
  let filteredproducts = [];
  productStore.filteredProducts.sort((a, b) => {
    return parseFloat(b.finalScore.value) - parseFloat(a.finalScore.value);
  });
  filteredproducts = filteredproducts.concat(
    productStore.filteredProducts,
    productStore.productDetails[productStore.firstQuestionAskedOrNot]
  );
  filteredproducts = Array.from(new Set(filteredproducts));
  productStore.productDetails[productStore.firstQuestionAskedOrNot] = filteredproducts;
};
onBeforeMount(() => {
  filterProductsByPrice();
});

// Function to calculate the number of objects in a certain price range
function countProductsInRange(minPrice, maxPrice) {
  return productStore.productDetails[productStore.firstQuestionAskedOrNot].filter(
    (product) => {
      const price = parseFloat(product.price.value); // Extract price from the object and convert to float
      return price >= minPrice && price <= maxPrice;
    }
  ).length;
}

// Define your price ranges
const priceRanges = computed(() => {
  const ranges = [];
  for (let min = minval.value; min < maxval.value; min += interval.value) {
    const max = Math.min(min + interval.value - 1, maxval.value); // Ensure the max value doesn't exceed maxPrice
    ranges.push({ min, max });
  }
  return ranges;
});

const productsCountInRanges = computed(() => {
  return priceRanges.value.map((range) => {
    const count = countProductsInRange(range.min, range.max);
    return { range, count };
  });
});
</script>
