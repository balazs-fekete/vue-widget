<template>
  <form class="w-full mx-auto py-3">
    <select
      v-model="selectedOption"
      :disabled="disabled"
      class="custom-select appearance-none w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primaryFocus focus:border-primaryFocus"
      @change="emitSelectedOption"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Select an option',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['optionSelected']);

const selectedOption = ref('');

function getOptionLabel(option) {
  if (props.label && typeof option === 'object') {
    let label = option[props.label];

    if ('value' in option) {
      if (option.value === 0) {
        label += ' - Included';
      } else if (typeof option.value === 'number') {
        label += ` - $${option.value.toFixed(2)} / piece`;
      }
    }

    return label;
  }

  return option;
}

function emitSelectedOption() {
  emit('optionSelected', selectedOption.value);
}
</script>

<style scoped>
.custom-select {
  appearance: none !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 1rem center !important;
  background-size: 1em !important;
  padding-right: 2.5rem !important;
}
</style>
