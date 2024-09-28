<template>
  <div class="popup-border rounded-lg">
    <table class="full-width bordered">
      <tbody>
        <tr class="bg-blue-50">
          <th
            class="font-sans text-subtitle1 text-weight-medium text-left q-pa-sm border-bottom-top"
            v-text="props.title"
          ></th>
        </tr>
        <tr class="" v-for="specs in props.specs">
          <div
            v-if="specs.name == 'Price'"
            class="flex justify-between q-py-sm q-px-md border-bottom-content"
          >
            <th class="text-left font-sans q-ml-lg" v-text="specs.name" />
            <td class="flex text-right font-sans">
              <div v-text="specs.value"></div>
              <div class="row q-ml-md">
                <div
                  class="text-caption font-sans blue-text-color text-weight-medium"
                >
                  <a
                    :href="
                      props.productSpecs.productURL
                        ? props.productSpecs.productURL.value
                        : '#'
                    "
                    target="_blank"
                    >Shop</a
                  >
                </div>
                <simple-right-arrow-svg
                  class="simple-right-arrow-svg q-mx-sm"
                />
              </div>
            </td>
          </div>
          <div
            v-else-if="specs == props.specs[props.specs.length - 1]"
            class="flex justify-between q-py-sm q-px-md"
          >
            <div class="row">
              <question-mark-svg />
              <th class="font-sans q-ml-sm" v-text="specs.name"></th>
            </div>

            <td class="text-right font-sans">
              <div v-text="specs.value"></div>
            </td>
          </div>
          <div
            v-else
            class="flex justify-between q-py-sm q-px-md border-bottom-content"
          >
            <div class="row">
              <question-mark-svg />
              <th class="font-sans q-ml-sm" v-text="specs.name"></th>
            </div>

            <td class="text-right font-sans">
              <div v-text="specs.value"></div>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SimpleRightArrowSvg from "./svg/SimpleRightArrowSvg.vue";
import QuestionMarkSvg from "./svg/QuestionMarkSvg.vue";

const props = defineProps(["productSpecs", "title", "specs"]);
</script>
