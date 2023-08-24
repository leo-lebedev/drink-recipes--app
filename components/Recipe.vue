<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img
        :alt="'Picture of' + recipe.strDrinkThumb"
        :src="recipe.strDrinkThumb"
        class="hover:scale-125 transition-transform hover:rotate-2"
      />
    </div>

    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
      <button
        class="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
        type="button"
        @click="drinks.selectDrink(recipe.idDrink)"
      >
        See Recipe
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDrinksStore } from "~/stores/useDrinks";

const drinks = useDrinksStore();

defineProps({
  recipe: {
    type: Object,
  },
});
</script>
