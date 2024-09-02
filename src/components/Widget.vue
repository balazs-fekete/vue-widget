<template>
  <div class="relative flex flex-col justify-center mx-auto my-10 p-6 bg-white" :class="[borderOptions, marginY]">
    <Loader v-if="isLoading" />

    <template v-if="props.isHeaderNeeded">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ props.title }}</h5>
      <p class="font-normal text-gray-600">{{ props.description }}</p>
    </template>

    <DropdownSelect :options="products" :value="selectedProduct" label="name" placeholder="Select product..." @optionSelected="handleProductSelection" :class="marginTop" />

    <DropdownSelect :options="quantityOptions" :value="selectedQuantity" placeholder="Select quantity..." :disabled="!selectedProduct" @optionSelected="handleQuantitySelection" />

    <DropdownSelect
      v-if="isPostageOptionEnabled"
      :value="selectedPostage"
      :options="postageOptions"
      :disabled="isServiceDropdownDisabled"
      placeholder="Select Postage..."
      @optionSelected="handlePostageSelection"
    />

    <DropdownSelect
      :options="stockOptions"
      :value="selectedStock"
      :disabled="isServiceDropdownDisabled"
      label="label"
      placeholder="Select Stock..."
      @optionSelected="handleStockSelection"
    />

    <DropdownSelect
      :options="coatingOptions"
      :value="selectedCoating"
      :disabled="isServiceDropdownDisabled"
      label="label"
      placeholder="Select Coating..."
      @optionSelected="handleCoatingSelection"
    />

    <DropdownSelect
      :options="turnaroundOptions"
      :value="selectedTurnaround"
      :disabled="isServiceDropdownDisabled"
      label="label"
      placeholder="Select Turnaround..."
      @optionSelected="handleTurnaroundSelection"
    />

    <Summary />

    <BaseButton :text="props.buttonText" @on-button-click="onButtonClick"/>
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
  buttonText: {
    type: String,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  siteId: {
    type: String,
    required: true,
  },
  isBorderNeeded: {
    type: Boolean,
    required: false,
  },
  isHeaderNeeded: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['product-selected', 'on-button-click']);

const isLoading = ref(false);

const borderOptions = computed(() => props.isBorderNeeded ? 'border border-gray-200 rounded-lg shadow-md' : '');
const marginY = computed(() => props.isHeaderNeeded ? 'my-10' : 'my-2');
const marginTop = computed(() => props.isHeaderNeeded ? 'mt-4' : '');

const products = computed(() => productStore.products);
const selectedProduct = computed(() => productStore.selectedProduct);

const quantityOptions = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 3000, 3500, 4000, 4500, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
const selectedQuantity = computed(() => productStore.selectedQuantity);

const postageOptions = computed(() => (selectedProduct.value?.product_addons?.mailing_service ? Object.values(selectedProduct.value.product_addons.mailing_service) : []));
const selectedPostage = computed(() => productStore.selectedPostage);

const stockOptions = computed(() => {
  return selectedProduct.value?.product_addons?.stocks ? Object.values(selectedProduct.value.product_addons.stocks) : [];
});
const selectedStock = computed(() => productStore.selectedStock);

const coatingOptions = computed(() => (selectedProduct.value?.product_addons?.coating ? Object.values(selectedProduct.value.product_addons.coating) : []));
const selectedCoating = computed(() => productStore.selectedCoating);

const turnaroundOptions = computed(() => (selectedProduct.value?.product_addons?.turnaround ? Object.values(selectedProduct.value.product_addons.turnaround) : []));
const selectedTurnaround = computed(() => productStore.selectedTurnaround);

const isServiceDropdownDisabled = computed(() => !selectedProduct.value || !selectedQuantity.value);

const isPostageOptionEnabled = false; //to-do: get the value from a prop

async function fetchProducts() {
  try {
    isLoading.value = true;

    const payload = {
      orderType: props.orderType,
      siteId: props.siteId,
    };

    await productStore.fetchProductList(payload);
  } catch (error) {
    console.log('Error getting products: ', error);
  } finally {
    isLoading.value = false;
  }
}

async function getProductById() {
  try {
    isLoading.value = true;

    const payload = {
      orderType: props.orderType,
      siteId: props.siteId,
      qty: selectedQuantity.value,
      productId: selectedProduct.value.firebase_product_id,
    };

    await productStore.getProductById(payload);
  } catch (error) {
    console.log('Error getting product by id: ', error);
  } finally {
    isLoading.value = false;
  }
}

async function handleProductSelection(value) {
  productStore.selectedProduct = value;

  if (selectedQuantity.value) {
    await getProductById();
  }

  emitSelectedProduct(value);
}

function handleQuantitySelection(value) {
  productStore.selectedQuantity = value;

  getProductById();
}

function handlePostageSelection(value) {
  productStore.selectedPostage = value;
}

function handleStockSelection(value) {
  productStore.selectedStock = value;
}

function handleCoatingSelection(value) {
  productStore.selectedCoating = value;
}

function handleTurnaroundSelection(value) {
  productStore.selectedTurnaround = value;
}

function emitSelectedProduct(value) {
  emit('product-selected', value);
}

async function onButtonClick() {
  console.log('Button is clicked');
  const response = {
    order_type: props.orderType,
    list_purchase: 'false',
    category_slug: props.orderType,
    product_id: selectedProduct.value.firebase_product_id,
    stock: productStore.selectedStock.label,
    coating: productStore.selectedCoating.label,
    turnaround: productStore.selectedTurnaround.label,
    mailing_list: 'later',
    print_prep_ship: 'false',
    qty: selectedQuantity.value,
    purchased_qty: 'false',
    per_piece_list_price: '0',
    total_mailing_price: '',
    mailing_list_order_object: ''
  };

  console.log('Response:', response);
  emit('on-button-click', response);
}

onMounted(() => {
  fetchProducts();
});
</script>
