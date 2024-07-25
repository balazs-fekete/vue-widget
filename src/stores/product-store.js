import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
  //state
  const products = ref('');

  //getters

  //actions
  async function getProductList(payload) {
    try {
        console.log('[vue widget] started WP product request');

        const availableOrderTypes = ['targeted', 'eddm', 'saturation'];

        if (!availableOrderTypes.includes(payload.orderType)) {
            console.log('asdasdasd')
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
    getProductList
  };
});