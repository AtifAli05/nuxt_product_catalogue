<template>
  <div>
    <button @click="submitProduct">Send Dummy Product</button>
    <p v-if="response">{{ responseMessage }}</p>
  </div>
</template>

<script setup>
import { useAddProduct } from '@/composables/useAddProduct'
import { ref } from 'vue'

const responseMessage = ref('')
const response = ref(null)

const submitProduct = async () => {
  const dummyProduct = {
    title: 'Cool Sneakers',
    price: 129,
    description: 'Stylish and comfortable running shoes.',
    category: 'footwear',
    image: 'https://via.placeholder.com/300'
  }

  try {
    response.value = await useAddProduct(dummyProduct)
    responseMessage.value = `Success: ID ${response.value.id}`
  } catch (err) {
    responseMessage.value = 'Failed to send product.'
  }
}
</script>
