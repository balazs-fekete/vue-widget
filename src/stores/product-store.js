import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios'; // Import axios

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref('');
  const selectedProduct = ref('');
  const selectedQuantity = ref(0);

  const selectedPostage = ref({ label: '', value: 0 });
  const selectedStock = ref({ label: '', value: 0 });
  const selectedCoating = ref({ label: '', value: 0 });
  const selectedTurnaround = ref({ label: '', value: 0 });

  // Getters

  // Handle the flat fee services
  const getPricePerPieceValue = computed(() => {
    if (!selectedProduct.value?.product_addons) return 0;

    const basePricePerPiece = parseFloat(selectedProduct.value?.product_addons?.price_per_piece) || 1;
    const postagePrice = parseFloat(selectedPostage.value.value) || 0;
    const stockPrice = parseFloat(selectedStock.value.value) || 0;
    const coatingPrice = parseFloat(selectedCoating.value.value) || 0;
    const turnaroundPrice = parseFloat(selectedTurnaround.value.value) || 0;

    const calculatedPricePerPiece = basePricePerPiece + postagePrice + stockPrice + coatingPrice + turnaroundPrice || 0;

    return calculatedPricePerPiece;
  });

  // Actions
  async function fetchProductList(payload) {
    try {
      console.log('[vue widget] fetchProductList payload: ', payload);

      if (!checkOrderType(payload?.orderType)) {
        throw new Error('Error getting products: Order type is invalid');
      }

      resetSelectedValues();

      const response = await axios.post(`${import.meta.env.VITE_CLOUD_FUNCTION_URL}/productsHandler/getProducts`, {
        site_id: payload.siteId,
        order_type: payload.orderType,
      });

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

      resetSelectedValues();

      const response = await axios.post(`${import.meta.env.VITE_CLOUD_FUNCTION_URL}/productsHandler/getProduct`, {
        site_id: payload.siteId,
        order_type: payload.orderType,
        product_id: payload.productId,
        qty: payload.qty,
      });

      const data = response.data;

      selectedProduct.value = data;

      console.log('[vue widget] getProductById result: ', data);
    } catch (error) {
      console.log('[vue widget] Error getting product by id: ', error);
    }
  }

  function checkOrderType(orderType) {
    const availableOrderTypes = ['targeted', 'eddm', 'saturation'];

    return availableOrderTypes.includes(orderType);
  }

  function resetSelectedValues() {
    selectedPostage.value = { label: '', value: 0 };
    selectedStock.value = { label: '', value: 0 };
    selectedCoating.value = { label: '', value: 0 };
    selectedTurnaround.value = { label: '', value: 0 };
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
