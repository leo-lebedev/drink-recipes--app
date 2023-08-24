import { defineStore } from "pinia";
import APIservices from "@/services/APIservices";
import { useModalStore } from "./useModal";
import { useNotificationStore } from "~/stores/useNotifications";

export const useDrinksStore = defineStore("drinks", () => {
  const notifications = useNotificationStore();
  const modal = useModalStore();
  const categories = ref([]);
  const search = reactive({
    name: "",
    category: "",
  });

  const isLoading = ref(false);

  const recipes = ref([]);
  const recipe = ref({});

  onMounted(async function () {
    isLoading.value = true;
    try {
      const {
        data: { drinks },
      } = await APIservices.getCategories();
      categories.value = drinks;
    } catch (err) {
      console.log(err);
      notifications.show = true;
      notifications.error = true;
      notifications.text = err;

      setTimeout(() => {
        notifications.$reset();
      }, 3000);
    } finally {
      isLoading.value = false;
    }
  });

  async function getRecipes() {
    isLoading.value = true;
    try {
      const {
        data: { drinks },
      } = await APIservices.searchRecipes(search);
      // recipes.value = drinks;
      recipes.value = drinks.filter((recipe) =>
        recipe.strDrink.toLowerCase().includes(search.name.toLowerCase())
      );
    } catch (err) {
      notifications.show = true;
      notifications.error = true;
      notifications.text = err;

      setTimeout(() => {
        notifications.$reset();
      }, 3000);
    } finally {
      isLoading.value = false;
    }
  }

  async function selectDrink(id) {
    isLoading.value = true;
    try {
      const {
        data: { drinks },
      } = await APIservices.searchRecipe(id);
      recipe.value = drinks[0];
      modal.handleClickModal();
    } catch (err) {
      notifications.show = true;
      notifications.error = true;
      notifications.text = err;

      setTimeout(() => {
        notifications.$reset();
      }, 3000);
    } finally {
      isLoading.value = false;
    }
  }

  const noRecipe = computed(() => recipes.value.length === 0);

  return {
    categories,
    search,
    getRecipes,
    recipes,
    selectDrink,
    recipe,
    noRecipe,
    isLoading,
  };
});
