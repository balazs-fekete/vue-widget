<template>
  <div class="w-full mx-auto py-3">
    <button type="button" class="w-full text-white bg-primary hover:bg-primaryHover transition duration-300 font-medium rounded-full text-sm px-6 py-4 text-center" @click="onButtonClick">
      {{ text }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },

});

const emit = defineEmits(["onButtonClick"]);

function onButtonClick() {
  emit('on-button-click');
}

</script>
