import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
  //state
  const products = ref('');

  //getters

  //actions
  function getProductList() {}

  return {
    products,
  };
});
