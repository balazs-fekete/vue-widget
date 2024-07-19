<template>
  <div>
    <button @click="fetchPokemons">Refresh</button>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
const pokemons = ref([]);

async function fetchPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  pokemons.value = data.results;
}
</script>
