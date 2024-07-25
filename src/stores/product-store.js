import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductStore = defineStore('product', () => {
  //state
  const products = ref('');
  const selectedProduct = ref('');
  const selectedQuantity = ref(0);

  const selectedPostage = ref({ label: '', value: 0});
  const selectedStock = ref({ label: '', value: 0});
  const selectedCoating = ref({ label: '', value: 0});
  const selectedTurnaround = ref({ label: '', value: 0});

  //getters

  //to-do: handle the flat fee services
  const getPricePerPieceValue = computed(() => {
    return selectedProduct.value?.product_addons?.price_per_piece +
      parseFloat(selectedPostage.value.value + selectedStock.value.value + selectedCoating.value.value + selectedTurnaround.value.value) || 0;
  });

  //actions
  async function fetchProductList(payload) {
    try {
      console.log('[vue widget] started WP product request');

      const availableOrderTypes = ['targeted', 'eddm', 'saturation'];

      if (!availableOrderTypes.includes(payload.orderType)) {
        console.log('asdasdasd');
        throw new Error('Error getting products: Order type is invaid');
      }

      const response = await fetch(`https://devtest.onebrand.net/wp-json/amp/v2/products/?order_type=${payload.orderType}&qty=${payload.quantity}`);
      const data = await response.json();

      products.value = data.products;

      console.log('[vue widget] product from WP: ', data.products);
    } catch (error) {
      console.log('vue widget] Error getting products: ', error);
    }
  }

  return {
    products,
    selectedProduct,
    selectedQuantity,
    selectedPostage,
    selectedStock,
    selectedCoating,
    selectedTurnaround,
    getPricePerPieceValue,
    fetchProductList,
  };
});
