<template>
  <div class="relative flex flex-col justify-center mx-auto my-10 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="absolute inset-0 bg-white max-w-2xl bg-opacity-75 flex items-center justify-center rounded-lg z-10">
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    </div>

    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ props.title }}</h5>
    <p class="font-normal text-gray-600">{{ props.description }}</p>

    <form class="w-full mx-auto py-3 mt-5">
      <select v-model="selectedProduct" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        <option value="" disabled selected>Select a Size</option>
        <option v-for="product in products" :key="product.firebase_product_id" :value="product">{{ product.name }}</option>
      </select>
    </form>

    <form class="w-full mx-auto py-3">
      <select v-model="selectedPostageOption" :disabled="!selectedProduct" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        <option value="" disabled selected>Select Postage</option>
        <option v-for="postageOption in postageOptions" :key="postageOption.label" :value="postageOption.label">{{ postageOption.label }}</option>
      </select>
    </form>

    <form class="w-full mx-auto py-3">
      <select v-model="selectedStockOption" :disabled="!selectedPostageOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        <option value="" disabled selected>Select Stock</option>
        <option v-for="stockOption in stockOptions" :key="stockOption" :value="stockOption">{{ stockOption }}</option>
      </select>
    </form>

    <div class="w-full mx-auto py-3 flex justify-center">
      <button type="button" class="text-white bg-green-500 hover:bg-green-600 font-medium rounded-full text-sm px-6 py-4 text-center">Start my order</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const isLoading = ref(false);

const products = ref([]);
const selectedProduct = ref('');

const postageOptions = computed(() => (selectedProduct.value ? Object.values(selectedProduct.value.product_addons.mailing_services) : []));
const selectedPostageOption = ref('');

const stockOptions = ['Standard', '80 lb. Text', '100 lb. Gloss Cover', '100 lb. Gloss Text'];
const selectedStockOption = ref('');

async function fetchProducts() {
  try {
    console.log('[vue widget] started WP product request');

    isLoading.value = true;

    const response = await fetch('https://devtest.onebrand.net/wp-json/amp/v2/products/?order_type=targeted&qty=1000');
    const data = await response.json();

    products.value = data.products;

    console.log('[vue widget] product from WP: ', data.products);
  } catch (error) {
    console.log('vue widget] Error getting products: ', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchProducts();
});
</script>
