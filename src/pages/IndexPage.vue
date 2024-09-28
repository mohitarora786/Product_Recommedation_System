<template>
  <q-page class="grid">
    <main-header/>
    <main-container/>
  </q-page>
</template>

<script setup lang="ts">
import MainHeader from 'components/MainHeader.vue';
import MainContainer from 'components/MainContainer.vue';

defineOptions({
  name: 'IndexPage'
});
</script>
