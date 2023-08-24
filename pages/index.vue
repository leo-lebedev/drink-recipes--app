<template>
  <h1 class="text-6xl font-extrabold">Recipes</h1>

  <p
    v-if="drinks.noRecipe"
    class="my-10 text-center text-xl font-extrabold mb-10"
  >
    There is no result, use the Search form
  </p>

  <p
    v-else-if="drinks.isLoading"
    class="my-10 text-center text-xl font-extrabold mb-10"
  >
    Loading Recipes...
  </p>

  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
  >
    <Recipe
      v-for="recipe in drinks.recipes"
      :key="recipe.idDrink"
      :recipe="recipe"
    />
  </div>
</template>

<script setup>
import Recipe from "@/components/Recipe.vue";
import { useDrinksStore } from "~/stores/useDrinks";

const drinks = useDrinksStore();
</script>
