<template>
  <v-card class="pa-6" max-width="1200" >
    <v-card-title>My Form</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Name" v-model="form.name" />
        <v-text-field label="Email" v-model="form.email" />
        <v-text-field label="Phone" v-model="form.phone" />
        <v-text-field label="Address" v-model="form.address" />
        <v-btn color="primary" class="mt-4" @click="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

const submit = () => {
  console.log('Form Submitted:', form.value)
}
</script>
