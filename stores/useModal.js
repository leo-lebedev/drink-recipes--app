import { defineStore } from "pinia";
import { useFavoritesStore } from "./useFavorites";
import { useDrinksStore } from "./useDrinks";

export const useModalStore = defineStore("modal", () => {
  const favorites = useFavoritesStore();
  const drinks = useDrinksStore();
  const modal = ref(false);

  function handleClickModal() {
    modal.value = !modal.value;
  }

  const textPublisher = computed(() => {
    return favorites.existsFavorite(drinks.recipe.idDrink)
      ? "Remove from Favorites"
      : "Add to Favorites";
  });

  return {
    modal,
    handleClickModal,
    textPublisher,
  };
});
