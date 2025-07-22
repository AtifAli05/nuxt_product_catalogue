export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const payload = body.data

  try {
    const response = await $fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (err) {
    console.error('Forwarding failed:', err)
    return { error: 'Failed to forward request' }
  }
})
