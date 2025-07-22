<template>
  <v-app>
    <Navbar />
    <v-layout>
      <Sidebar />
      <v-main style="min-height: calc(100vh - 64px); min-width: 100vw">
        <NuxtPage />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'
import Navbar from '~/components/Navbar.vue'
</script>