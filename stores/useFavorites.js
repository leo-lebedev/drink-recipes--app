import { defineStore } from "pinia";
import { useDrinksStore } from "./useDrinks";
import { useModalStore } from "./useModal";
import { useNotificationStore } from "./useNotifications";
import nuxtStorage from "nuxt-storage";

export const useFavoritesStore = defineStore("favorites", () => {
  const drinks = useDrinksStore();
  const favorites = ref([]);
  const modal = useModalStore();
  const notifications = useNotificationStore();

  onMounted(() => {
    favorites.value = nuxtStorage.localStorage.getData("favorites") || [];
  });

  watch(
    favorites,
    () => {
      sincronizarLocalStorage();
    },
    {
      deep: true,
    }
  );

  const sincronizarLocalStorage = () => {
    nuxtStorage.localStorage.setData("favorites", favorites.value);
  };

  const existsFavorite = (id) => {
    const favoritesLocalStorage = nuxtStorage.localStorage.getData("favorites");

    return favoritesLocalStorage.some((favorite) => favorite.idDrink === id);
  };

  const deleteFavorites = () => {
    favorites.value = favorites.value.filter(
      (favorites) => favorites.idDrink !== drinks.recipe.idDrink
    );

    notifications.show = true;
    notifications.text = `Removed From Favorites ${drinks.recipe.strDrink} cocktail.`;

    setTimeout(() => {
      notifications.$reset();
    }, 3000);
  };

  const addFavorites = () => {
    favorites.value.push(drinks.recipe);

    notifications.show = true;
    notifications.text = `Added to Favorites ${drinks.recipe.strDrink} cocktail.`;

    setTimeout(() => {
      notifications.$reset();
    }, 3000);
  };

  const handleClickFavorite = () => {
    if (existsFavorite(drinks.recipe.idDrink)) {
      deleteFavorites();
    } else {
      addFavorites();
    }

    modal.modal = false;
  };

  return {
    handleClickFavorite,
    favorites,
    existsFavorite,
  };
});
