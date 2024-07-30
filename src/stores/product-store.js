import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios'; // Import axios

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref('');
  const selectedProduct = ref('');
  const selectedQuantity = ref(0);

  const selectedPostage = ref({ label: '', value: 0});
  const selectedStock = ref({ label: '', value: 0});
  const selectedCoating = ref({ label: '', value: 0});
  const selectedTurnaround = ref({ label: '', value: 0});

  // Getters

  // Handle the flat fee services
  const getPricePerPieceValue = computed(() => {
    return selectedProduct.value?.product_addons?.price_per_piece +
      parseFloat(selectedPostage.value.value + selectedStock.value.value + selectedCoating.value.value + selectedTurnaround.value.value) || 0;
  });

  // Actions
  async function fetchProductList(payload) {
    try {
      console.log('[vue widget] fetchProductList payload: ', payload);

      if (!checkOrderType(payload?.orderType)) {
        throw new Error('Error getting products: Order type is invalid');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_CLOUD_FUNCTION_URL}/productsHandler/getProducts`,
        {
          site_id: payload.siteId,
          order_type: payload.orderType
        }
      );

      const data = response.data;

      products.value = data.products;

      console.log('[vue widget] fetchProductList result: ', data.products);
    } catch (error) {
      console.log('[vue widget] Error getting products: ', error);
    }
  }

  async function getProductById(payload) {
    try {
      console.log('[vue widget] getProductById payload: ', payload);

      if (!checkOrderType(payload?.orderType)) {
        throw new Error('Error getting products: Order type is invalid');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_CLOUD_FUNCTION_URL}/productsHandler/getProduct`,
        {
          site_id: payload.siteId,
          order_type: payload.orderType,
          product_id: payload.productId,
          qty: payload.qty,
        }
      );

      const data = response.data;

      console.log('[vue widget] getProductById result: ', data);

    } catch (error) {
      console.log('[vue widget] Error getting product by id: ', error);
    }
  }

  function checkOrderType(orderType) {
    const availableOrderTypes = ['targeted', 'eddm', 'saturation'];

    return availableOrderTypes.includes(orderType);
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
    getProductById,
  };
});
