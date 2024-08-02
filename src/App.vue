<template>
  <link rel="stylesheet" href="https://vue-custom-widget.netlify.app/style.css" />
  <Widget
    :title="props.title"
    :description="props.description"
    :buttonText="props.buttonText"
    :orderType="props.orderType"
    :siteId="props.siteId"
    :isBorderNeeded="props.isBorderNeeded"
    :isHeaderNeeded="props.isHeaderNeeded"
    @product-selected="onProductSelected"
    @on-button-click="onButtonClick"
    :style="{ width: props.width, height: props.height }"
  />
</template>

<script setup>
import Widget from './components/Widget.vue';
import { defineProps, defineEmits, ref } from 'vue';

// Define props for the component
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Product Pricing Estimator.',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  buttonText: {
    type: String,
    required: false,
    default: 'Start my order',
  },
  width: {
    type: String,
    required: false,
    default: '350px',
  },
  height: {
    type: String,
    required: false,
    default: '500px',
  },
  orderType: {
    type: String,
    required: true,
    validator: (value) => ['targeted', 'eddm', 'saturation'].includes(value),
  },
  siteId: {
    type: String,
    required: true,
  },
  isBorderNeeded: {
    type: Boolean,
    required: false,
    default: false,
  },
  isHeaderNeeded: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const emit = defineEmits(['product-selected', 'vue-pricing-widget']);

function onProductSelected(selectedProduct) {
  console.log('[vue-widget] Product selected:', selectedProduct);

  // Dispatch a new event from the window
  const customEvent = new CustomEvent('product-selected', {
    detail: selectedProduct,
    bubbles: true,
    composed: true,
  });
  window.dispatchEvent(customEvent);
}

function onButtonClick(selectedOptions) {
  console.log('[vue-widget] Selected options:', selectedOptions);

  // Dispatch a new event from the window
  const customEvent = new CustomEvent('vue-pricing-widget', {
    detail: selectedOptions,
    bubbles: true,
    composed: true,
  });
  window.dispatchEvent(customEvent);
}

onButtonClick
</script>
