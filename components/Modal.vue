<template>
  <Head>
    <Title> Cocktails App {{ drinks.recipe.strDrink }}</Title>
    <Meta :content="drinks.recipe.strInstructions" name="description" />
  </Head>

  <TransitionRoot :show="modal.modal" as="template">
    <Dialog
      as="div"
      class="relative z-10 overscroll-y-contain"
      @close="modal.handleClickModal()"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            s
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {{ drinks.recipe.strDrink }}
                  </DialogTitle>

                  <img
                    :alt="'picture of' + drinks.recipe.strDrink"
                    :src="drinks.recipe.strDrinkThumb"
                  />

                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    Ingredients and Quantities
                  </DialogTitle>

                  <div
                    class="text-gray-500 text-center font-bold mb-4"
                    v-html="formateIngredients().outerHTML"
                  ></div>

                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    Instructions
                  </DialogTitle>

                  <p class="text-lg text-gray-500 font-bold">
                    {{ drinks.recipe.strInstructions }}
                  </p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  class="w-full rounded bg-gray-600 p-3 font-bold text-white shadow hover:bg-gray-400"
                  type="button"
                  @click="modal.handleClickModal()"
                >
                  Close
                </button>

                <button
                  class="w-full rounded bg-orange-600 p-3 font-bold text-white shadow hover:bg-orange-400"
                  type="button"
                  @click="favorites.handleClickFavorite()"
                >
                  {{ modal.textPublisher }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useModalStore } from "~/stores/useModal";
import { useDrinksStore } from "~/stores/useDrinks";
import { useFavoritesStore } from "~/stores/useFavorites";

const modal = useModalStore();
const drinks = useDrinksStore();
const favorites = useFavoritesStore();

const formateIngredients = () => {
  const ingredientsDiv = document.createElement("DIV");

  for (let i = 1; i <= 15; i++) {
    if (drinks.recipe[`strIngredient${i}`]) {
      const ingredients = drinks.recipe[`strIngredient${i}`];
      const amount = drinks.recipe[`strMeasure${i}`];

      const ingredientQuantity = document.createElement("P");
      ingredientQuantity.classList.add("text-lg");
      ingredientQuantity.textContent = `${ingredients} + ${amount}`;

      ingredientsDiv.appendChild(ingredientQuantity);

      if (amount === null) {
        ingredientQuantity.textContent = `${ingredients}`;
      }
    }
  }

  return ingredientsDiv;
};
</script>
