<template>
  <div class="py-6 flex justify-between items-center border-t mt-4">
    <div class="leading-8">
      <h3 class="font-medium">Full Service Price per piece:</h3>
      <p class="font-light text-sm">includes everything, even postage!</p>
    </div>
    <h1 class="font-medium text-3xl">${{ pricePerPiece }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProductStore } from '../../stores/product-store.js';

const productStore = useProductStore();

const pricePerPiece = computed(() => productStore.getPricePerPieceValue.toFixed(2));
</script>
