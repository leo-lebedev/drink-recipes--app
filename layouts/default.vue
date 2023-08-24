<template>
  <Header />

  <main class="container mx-auto mt-10 p-5">
    <slot />
  </main>

  <Modal />
  <Notificacion />
</template>

<script setup>
import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";
import Notificacion from "@/components/Notificacion.vue";
</script>

<style lang="scss" scoped></style>
