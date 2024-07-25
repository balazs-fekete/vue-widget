<template>
  <div
    class="relative flex flex-col justify-center mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md"
    :class="{
      'max-w-md': props.width === 'md',
      'max-w-lg': props.width === 'lg',
      'max-w-xl': props.width === 'xl',
    }"
  >
    <Loader v-if="isLoading" />

    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ props.title }}</h5>
    <p class="font-normal text-gray-600">{{ props.description }}</p>

    <DropdownSelect :options="products" label="name" placeholder="Select product..." @optionSelected="handleProductSelection" class="mt-5" />

    <DropdownSelect :options="quantityOptions" placeholder="Select quantity..." :disabled="!selectedProduct" @optionSelected="handleQuantitySelection" />

    <DropdownSelect :options="postageOptions" :disabled="!selectedQuanity" label="label" placeholder="Select Postage..." @optionSelected="handlePostageSelection" />

    <DropdownSelect :options="stockOptions" :disabled="!selectedPostageOption" placeholder="Select Stock..." @optionSelected="handleStockSelection" />

    <Summary />

    <BaseButton />
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, computed, defineEmits } from 'vue';

import { useProductStore } from '../stores/product-store.js';

import DropdownSelect from './ui/DropdownSelect.vue';
import BaseButton from './ui/BaseButton.vue';
import Summary from './ui/Summary.vue';
import Loader from './ui/Loader.vue';

const productStore = useProductStore();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['product-selected']);

const isLoading = ref(false);

const products = computed(() => productStore.products);
const selectedProduct = ref('');

const quantityOptions = [10, 25, 50, 100, 150, 200, 300, 400, 500, 1000, 2000, 5000];
const selectedQuanity = ref(0);

const postageOptions = computed(() => (selectedProduct.value ? Object.values(selectedProduct.value.product_addons.mailing_services) : []));
const selectedPostageOption = ref('');

const stockOptions = ['Standard', '80 lb. Text', '100 lb. Gloss Cover', '100 lb. Gloss Text'];
const selectedStockOption = ref('');

async function fetchProducts() {
  try {
    isLoading.value = true;

    const payload = {
      orderType: props.orderType,
      quantity: 1000,
    };

    await productStore.getProductList(payload);
  } catch (error) {
    console.log('Error getting products: ', error);
  } finally {
    isLoading.value = false;
  }
}

function handleProductSelection(value) {
  selectedProduct.value = value;
  emitSelectedProduct(value);
}

function handleQuantitySelection(value) {
  selectedQuanity.value = value;
}

function handlePostageSelection(value) {
  selectedPostageOption.value = value;
}

function handleStockSelection(value) {
  selectedStockOption.value = value;
}

function emitSelectedProduct(value) {
  emit('product-selected', value);
}

onMounted(() => {
  fetchProducts();
});
</script>