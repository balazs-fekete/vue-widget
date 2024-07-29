<template>
  <link rel="stylesheet" href="https://vue-custom-widget.netlify.app/style.css" />
  <Widget
    :title="props.title"
    :description="props.description"
    :buttonText="props.buttonText"
    :orderType="props.orderType"
    @product-selected="onProductSelected"
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
    default: 'Default title',
  },
  description: {
    type: String,
    required: false,
    default: 'Default description.',
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
    required: false,
    default: 'targeted',
    validator: (value) => ['targeted', 'eddm', 'saturation'].includes(value),
  },
});

const emit = defineEmits(['product-selected']);

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
</script>
