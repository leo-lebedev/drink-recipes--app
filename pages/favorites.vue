<template>
  <h1 class="text-6xl font-extrabold">Favorites</h1>

  <div
    v-if="favorites.favorites.length"
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
  >
    <Recipe
      v-for="recipe in favorites.favorites"
      :key="recipe.idDrink"
      :recipe="recipe"
    />
  </div>

  <p v-else class="my-10 text-center text-xl font-extrabold mb-10">
    None of my favorite recipes. Would you like to add?
  </p>
</template>

<script setup>
import Recipe from "@/components/Recipe.vue";
import { useDrinksStore } from "~/stores/useDrinks";
import { useFavoritesStore } from "~/stores/useFavorites";

const favorites = useFavoritesStore();
const drinks = useDrinksStore();
</script>
