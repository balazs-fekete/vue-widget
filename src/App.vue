<template>
  <div ref="rootElement">
    <link rel="stylesheet" href="https://vue-custom-widget.netlify.app/style.css" />
    <TargetedWidget :title="props.title" :description="props.description" :width="props.width" @product-selected="onProductSelected" />
  </div>
</template>

<script setup>
import TargetedWidget from './components/TargetedWidget.vue';
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
  width: {
    type: String,
    required: false,
    default: 'md',
  },
});

const emit = defineEmits(['product-selected']);

const rootElement = ref(null);

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
