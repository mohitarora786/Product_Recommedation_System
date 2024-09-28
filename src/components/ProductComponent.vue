<template>
  <div class="row card-wrapper q-px-md q-py-md">
    <q-card
      class="cursor-pointer col-12 my-card"
      :class="{
        'slide-up': productStore.productDetails[
          productStore.firstQuestionAskedOrNot
        ][props.index].animation
          ? productStore.productDetails[productStore.firstQuestionAskedOrNot][
              props.index
            ].animation.value === 'slideUp'
          : false,
        'slide-down': productStore.productDetails[
          productStore.firstQuestionAskedOrNot
        ][props.index].animation
          ? productStore.productDetails[productStore.firstQuestionAskedOrNot][
              props.index
            ].animation.value === 'slideDown'
          : false,
        'slide-zig-zag': productStore.productDetails[
          productStore.firstQuestionAskedOrNot
        ][props.index].animation
          ? productStore.productDetails[productStore.firstQuestionAskedOrNot][
              props.index
            ].animation.value === 'slidezigzag'
          : false,
        'slide-in': productStore.productDetails[
          productStore.firstQuestionAskedOrNot
        ][props.index].animation
          ? productStore.productDetails[productStore.firstQuestionAskedOrNot][
              props.index
            ].animation.value === 'slideIn'
          : false,
        disabled: productStore.storeLoader,
      }"
      @click="viewSpecs()"
      :style="{ animationDelay: `${0.033 * props.index}s` }"
    >
      <div class="product-number" style="opacity: 1">
        <div
          class="flex justify-center items-center border w-7 h-7 bg-secondary border-grey-circle text-gray-900 indexing-styling"
        >
          <div class="text-xs leading-zero font-sans font-bold text-white">
            {{ props.index + 1 }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4 relative-position">
          <div class="full-height justify-center row hover-scale">
            <div class="col-8 text-center self-center overflow-hidden">
              <img
                :src="
                  props.Productdetails.imageURL
                    ? props.Productdetails.imageURL.value
                    : ''
                "
                class="product-image"
                alt="product-image"
              />
            </div>
            <div class="col-4" v-if="props.Productdetails.badgeURL && props.Productdetails.badgeURL.value">
              <div class="badge-grid">
                  <img
                    :src="
                      props.Productdetails.badgeURL
                        ? props.Productdetails.badgeURL.value
                        : ''
                    "
                    class="product-badge"
                    alt="badge"
                  />
              </div>
              <!-- <div class="progress-rating absolute q-pl-sm">
                <q-knob
                  :modelValue="0"
                  readonly
                  :angle="180"
                  :min="0"
                  :max="10"
                  :value="
                    props.Productdetails.valueScore
                      ? Number(props.Productdetails.valueScore.value)
                      : ''
                  "
                  show-value
                  size="42px"
                  :thickness="0.22"
                  color="secondary"
                  track-color="light-green-1"
                  class="text-secondary text-h6"
                />
              </div> -->
            </div>
          </div>
        </div>
        <div class="col-8 q-py-sm q-px-md bg-info column justify-between">
          <div class="column">
            <div class="flex flex-grow justify-between w-full">
              <div class="row">
                <span
                  class="row text-subtitle1 font-sans text-weight-bold q-mr-sm"
                  >{{
                    props.Productdetails.name
                      ? props.Productdetails.name.value
                      : ""
                  }}</span
                >
                <div v-if="productOfficialRating > 0">
                  <q-rating
                    v-model="productOfficialRating"
                    max="5"
                    size="18px"
                    color="blue"
                    icon="star_border"
                    icon-selected="star"
                    icon-half="star_half"
                    no-dimming
                    readonly
                  />
                </div>
              </div>
              <div
                class="text-small font-sans text-white bg-secondary rounded-xl text-center"
                style="width: 80px; height: 20px"
                v-if="
                  props.Productdetails.allBestListNames.value.includes('ears')
                "
              >
                Fit Small Ear
              </div>
            </div>
            <span
              class="text-small text-weight-medium q-pt-xs text-letter-spacing"
              v-if="props.Productdetails.productPro.value.length > 0"
            >
              Pros:
              {{
                props.Productdetails.productPro
                  ? replaceWithDot(props.Productdetails.productPro.value)
                  : ""
              }}
            </span>
            <span
              class="text-small text-weight-medium q-pt-sm text-letter-spacing"
              v-if="props.Productdetails.productPro.value.length > 0"
            >
              Cons: {{
                props.Productdetails.productCon
                  ? replaceWithDot(props.Productdetails.productCon.value)
                  : ""
              }}
            </span>
            <div
              class="text-small font-sans text-weight-medium q-my-auto q-pt-xs q-pb-sm text-grey"
            >
              MRSP:- ${{
                props.Productdetails.price
                  ? props.Productdetails.price.value
                  : 0
              }}
            </div>
            <transition
              appear
              appear-class="delayed-appear"
              enter-active-class="animated zoomIn slower delay-1s repeat-2"
            >
              <span
                class="text-weight-regular text-caption text-letter-spacing"
                v-if="
                  productStore.budsOrHeadphones &&
                  productStore.firstQuestionAskedOrNot > 0
                "
              >
                <q-icon
                  name="headset"
                  color="positive"
                  size="15px"
                  class="q-mr-xs"
                />Type- {{ productStore.budsOrHeadphones }}</span
              >
            </transition>
            <transition
              appear
              appear-class="delayed-appear"
              enter-active-class="animated bounceIn slower delay-1s repeat-2"
            >
              <span
                class="text-weight-regular text-caption text-letter-spacing"
                v-if="
                  productStore.wiredOrWireless &&
                  productStore.firstQuestionAskedOrNot > 1
                "
                ><q-icon
                  name="bluetooth"
                  color="blue"
                  size="15px"
                  class="q-mr-xs"
                />Connectivity-
                {{
                  productStore.wiredOrWireless.replace(/Connectivity/g, "")
                }}</span
              >
            </transition>
            <transition
              appear
              appear-class="delayed-appear"
              enter-active-class="animated zoomIn slower delay-1s repeat-2"
            >
              <span
                class="text-weight-regular text-caption text-letter-spacing"
                v-if="DeviceType()"
                ><q-icon
                  name="phone_iphone"
                  color="grey"
                  size="15px"
                  class="q-mr-xs"
                />Optimised For- {{ productStore.deviceType }}</span
              >
            </transition>
          </div>
          <div class="justify-end">
            <div class="flex q-mt-xs text-center">
              <q-space></q-space>
              <q-btn
                class="text-caption font-sans text-white text-weight-medium bg-orange rounded small-buttons"
                size="10px"
                @click="
                  viewPriceOnAmazon(props.Productdetails.productURL.value)
                "
                @click.stop
              >
                Check Price
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
  <!-- popup -->
  <q-dialog v-model="viewSpecifications">
    <q-card class="specs-main-card">
      <q-card-section class="row items-center q-pb-none">
        <!-- <div class="text-h6"></div> -->
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none text-center column">
        <div class="overflow-hidden q-mb-md">
          <img
            :src="
              props.Productdetails.imageURL
                ? props.Productdetails.imageURL.value
                : ''
            "
            class="q-mx-auto product-specs-image"
          />
        </div>
        <div class="row justify-between q-px-md q-my-lg product-row-gap">
          <span class="text-h4 font-sans text-weight-medium">{{
            props.Productdetails.name ? props.Productdetails.name.value : ""
          }}</span>
          <div>
            <q-btn
              class="text-caption font-sans text-white text-weight-medium bg-orange rounded-xl full-height text-capitalize specs-card-button"
              size="12px"
              @click="viewPriceOnAmazon(props.Productdetails.productURL.value)"
            >
              Check Price
            </q-btn>
          </div>
        </div>

        <span
          class="text-subtitle2 font-sans text-weight-regular text-left q-ml-md q-mr-lg text-italic q-my-md"
          v-if="props.Productdetails.fullOverview"
        >
          {{
            props.Productdetails.fullOverview
              ? props.Productdetails.fullOverview.value
              : ""
          }}</span
        >
        <span
          class="text-h6 font-sans text-weight-bold text-left q-ml-md cursor-pointer q-mt-md q-mb-lg products-review-text-decoration"
          @click="productReview(props.Productdetails.productReview.value)"
          v-if="props.Productdetails.productReview"
        >
          Read Our Full Review...
        </span>
        <div class="row q-my-md">
          <div class="col-6 text-left">
            <div class="q-pl-md text-h6">What we like</div>
            <ul class="custom-pros-list q-pl-md">
              <li
                v-for="(item, index) in productProList"
                :key="index"
                class="text-gray-500 q-py-sm pros-and-cons-letter-spacing"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="col-6 text-left">
            <div class="q-pl-md text-h6">What we don't like</div>
            <ul class="custom-cons-list q-pl-md">
              <li
                v-for="(item, index) in productConList"
                :key="index"
                class="text-gray-500 q-py-sm pros-and-cons-letter-spacing"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <q-table
          flat
          :rows="rows"
          :columns="columns"
          row-key="name"
          separator="none"
          class="rounded-xl"
          :class="{ 'light-grey': !productStore.darkTheme }"
          :pagination="initialPagination"
          hide-pagination
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="">
                <div
                  class="text-subtitle1 font-sans text-weight-bold"
                  v-if="col.name == 'name'"
                >
                  {{ col.label }}
                </div>
                <div
                  v-else
                  class="text-subtitle1 font-sans text-weight-bold specs-table-header"
                >
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>
          <!-- <template v-slot:body-cell="props">
            <q-td :props="props" class="q-py-none">
              {{ props.value }}
            </q-td>
          </template> -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="first_name" :props="props">
                {{ props.row.first_name }}
              </q-td>
              <q-td key="second_name" :props="props">
                {{ props.row.second_name }}
              </q-td>
              <q-td key="third_name" :props="props">
                {{ props.row.third_name }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useProductStore } from "src/stores/products-store";
import { ref, computed, onBeforeUnmount } from "vue";
const productStore = useProductStore();

const props = defineProps(["Productdetails", "index"]);
const viewSpecifications = ref(false);
const productOfficialRating = ref(
  props.Productdetails.productOfficialRating
    ? (Number(props.Productdetails.productOfficialRating.value) / 10) * 5
    : 0
);
const productReview = (reviewLink) => {
  window.open(reviewLink, "_blank");
};

const columns = ref([
  {
    name: "name",
    required: true,
    label: "Rating Metric",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: "first_name",
    align: "center",
    label: computed(
      () =>
        productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
          .name.value
    ),
    field: "first_name",
  },
  {
    name: "second_name",
    align: "center",
    label: computed(
      () =>
        productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
          .name.value
    ),
    field: "second_name",
  },
  {
    name: "third_name",
    align: "center",
    label: computed(
      () =>
        productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
          .name.value
    ),
    field: "third_name",
  },
]);

const rows = ref([
  //Durability score
  {
    name: "Durability",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .durabilityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .durabilityScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .durabilityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .durabilityScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .durabilityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .durabilityScore.value
        : "-"
    ),
  },
  //Value score
  {
    name: "Value",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .valueScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .valueScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .valueScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .valueScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .valueScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .valueScore.value
        : "-"
    ),
  },
  //Design Score
  {
    name: "Design",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .designScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .designScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .designScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .designScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .designScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .designScore.value
        : "-"
    ),
  },
  //Connectivity Score
  {
    name: "Connectivity",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .connectivityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .connectivityScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .connectivityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .connectivityScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .connectivityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .connectivityScore.value
        : "-"
    ),
  },
  //Anc Score
  {
    name: "ANC",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .ANC_Score
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .ANC_Score.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .ANC_Score
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .ANC_Score.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .ANC_Score
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .ANC_Score.value
        : "-"
    ),
  },
  //Base Score
  {
    name: "Bass",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .bassScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .bassScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .bassScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .bassScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .bassScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .bassScore.value
        : "-"
    ),
  },
  //Comfort Score
  {
    name: "Comfort",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .comfortScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .comfortScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .comfortScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .comfortScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .comfortScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .comfortScore.value
        : "-"
    ),
  },
  //Feature Score
  {
    name: "Feature",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .featureScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .featureScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .featureScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .featureScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .featureScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .featureScore.value
        : "-"
    ),
  },
  //Mic Score
  {
    name: "Microphone",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .microphoneScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .microphoneScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .microphoneScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .microphoneScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .microphoneScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .microphoneScore.value
        : "-"
    ),
  },
  //Midrange Score
  {
    name: "Midrange",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .midrangeScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .midrangeScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .midrangeScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .midrangeScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .midrangeScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .midrangeScore.value
        : "-"
    ),
  },
  //Portabilty Score
  {
    name: "Portability",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .portabilityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .portabilityScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .portabilityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .portabilityScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .portabilityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .portabilityScore.value
        : "-"
    ),
  },
  //SoundQuality Score
  {
    name: "Sound Quality",
    first_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
        .soundQualityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][0]
            .soundQualityScore.value
        : "-"
    ),
    second_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
        .soundQualityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][1]
            .soundQualityScore.value
        : "-"
    ),
    third_name: computed(() =>
      productStore.productDetails[productStore.firstQuestionAskedOrNot] &&
      productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
        .soundQualityScore
        ? productStore.productDetails[productStore.firstQuestionAskedOrNot][2]
            .soundQualityScore.value
        : "-"
    ),
  },
]);

const initialPagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 15,
});

const productProList = computed(() => {
  return props.Productdetails.productPro.value
    .split("|")
    .map((item) => item.trim());
});

const productConList = computed(() => {
  return props.Productdetails.productCon.value
    .split("|")
    .map((item) => item.trim());
});

const replaceWithDot = (str) => {
  const parts = str.split("|");
  const firstThree = parts
    .slice(0, 2)
    .map((part) => `•${part.trim()}`)
    .join(" ");
  return firstThree;
  // return parts.map((part) => `•${part.trim()}`).join(" ");
};

const DeviceType = () => {
  if (props.Productdetails.allBestListNames.value) {
    return (
      productStore.deviceType &&
      productStore.firstQuestionAskedOrNot > 3 &&
      (props.Productdetails.name.value.includes(productStore.deviceType) ||
        props.Productdetails.allBestListNames.value.includes(
          'iphone'
        ))
    );
  } else return false;
};

const viewSpecs = () => {
  if (!productStore.storeLoader) {
    viewSpecifications.value = true;
  }
};
const viewPriceOnAmazon = (link) => {
  if (!productStore.storeLoader) {
    window.open(link, "_blank");
  }
};
</script>

<style>
.simple-right-arrow-svg {
  cursor: pointer;
  width: 0.75rem;
  color: blue;
}

.specs-main-card {
}
</style>
