<template>
  <Widget
    title="EDDM Price Estimator"
    description="Use the printing calculator below to start your order."
    buttonText="Launch Map Tool"
    orderType="eddm"
    :style="{ width: '550px', height: '700px' }"
  />
</template>

<script setup>
import Widget from './components/Widget.vue';
</script>
