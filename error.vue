<template>
  <div
    class="mt-2 max-w-sm mx-auto text-center p-3 rounded-md bg-white shadow-md h-screen"
  >
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Ooops.</p>
    <p class="mt-7">{{ error.message }}</p>
    <button
      class="btn my-7 mt-2 p-4 rounded-md bg-white shadow-md h-full"
      @click="handleError"
    >
      Go Home...
    </button>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
