<template>
  <link rel="stylesheet" href="https://vue-custom-widget.netlify.app/style.css" />
  <TargetedWidget :title="props.title" :description="props.description" />
</template>

<script setup>
import TargetedWidget from './components/TargetedWidget.vue';

import { defineProps } from 'vue';

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
});
</script>
