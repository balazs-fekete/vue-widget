<template>
  <div class="flex flex-col justify-center mx-auto my-10 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Direct Mail Build and Price Tool</h5>
    <p class="font-normal text-gray-600">Use the printing calculator below to start your order.</p>

    <form class="w-full mx-auto py-3 mt-5">
      <select v-model="selectedSize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        <option value="" disabled selected>Select a Size</option>
        <option v-for="product in products" :key="product.firebase_product_id" :value="product.name">{{ product.name }}</option>
      </select>
    </form>

    <form class="w-full mx-auto py-3">
      <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        <option selected>Select stock</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </form>

    <form class="w-full mx-auto py-3">
      <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        <option selected>Select coating</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </form>

    <div class="w-full mx-auto py-3 flex justify-center">
      <button type="button" class="text-white bg-green-500 hover:bg-green-600 font-medium rounded-full text-sm px-6 py-4 text-center">Start my order</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const products = ref([]);
const selectedSize = ref('');

async function fetchProducts() {
  try {
    console.log('[vue widget] started WP product request');
    const response = await fetch('https://devtest.onebrand.net/wp-json/amp/v2/products/?order_type=targeted&qty=1000');
    const data = await response.json();

    products.value = data.products;

    console.log('[vue widget] product from WP: ', data.products);
  } catch (error) {
    console.log('vue widget] Error getting products: ', error);
  }
}

onMounted(() => {
  fetchProducts();
});
</script>
