<template>
  <header :class="{ header: isHomepage }" class="bg-slate-800 p-5">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <NuxtLink to="/">
            <img alt="Logo" class="w-24" src="@/public/logo.svg" />
          </NuxtLink>
        </div>

        <nav class="flex gap-4 text-white">
          <NuxtLink
            active-class="text-orange-500"
            class="uppercase font-bold"
            to="/"
          >
            Main
          </NuxtLink>

          <div class="relative">
            <NuxtLink
              active-class="text-orange-500"
              class="uppercase font-bold relative"
              to="/favorites"
            >
              Favorites
            </NuxtLink>

            <div
              v-if="favoritesStore?.favorites?.length"
              class="absolute -right-5 top-[1px]"
            >
              {{ favoritesStore.favorites.length }}
            </div>
          </div>
        </nav>
      </div>

      <form
        v-if="isHomepage"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingredients"
            >Name or Ingredients</label
          >

          <input
            id="ingredients"
            v-model="store.search.name"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Name or ingredient: eg. Vodka, Tequila, etc..."
            type="text"
          />

          <div class="space-y-4">
            <label
              class="block text-white uppercase font-extrabold text-lg"
              for="category"
              >Category</label
            >

            <select
              id="category"
              v-model="store.search.category"
              class="p-3 w-full rounded-lg focus:outline-none"
              placeholder="Name or ingredient: eg. Vodka, Tequila, etc..."
              type="text"
            >
              <option value="">--- Select ---</option>
              <option
                v-for="category in store.categories"
                :key="category.strCategory"
                :value="category.strCategory"
              >
                {{ category.strCategory }}
              </option>
            </select>
          </div>
        </div>
        <input
          :disabled="store.isLoading"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          type="submit"
          value="Search Recipes"
        />
      </form>
    </div>
  </header>
</template>

<script setup>
import { useDrinksStore } from "~/stores/useDrinks";
import { useNotificationStore } from "@/stores/useNotifications";
import { useFavoritesStore } from "~/stores/useFavorites";

const route = useRoute();
const store = useDrinksStore();
const favoritesStore = useFavoritesStore();
const isHomepage = computed(() => route.name === "index");
const notifications = useNotificationStore();

const handleSubmit = () => {
  if (Object.values(store.search).includes("")) {
    notifications.$patch({
      text: "All fields are required",
      show: true,
      error: true,
    });
    return;
  }
  store.getRecipes();
};
</script>

<style>
.header {
  background-image: url("@/public/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
