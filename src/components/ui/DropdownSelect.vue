<template>
  <form class="w-full mx-auto py-3">
    <select v-model="selectedOption" :disabled="disabled" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4" @change="emitSelectedOption">
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
  return props?.label ? option[props.label] : option;
}

function emitSelectedOption() {
  emit('optionSelected', selectedOption.value);
}
</script>
