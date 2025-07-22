export const useAddProduct = async (product) => {
  return await $fetch('/api/add-product-proxy', {
    method: 'POST',
    body: { data: product }
  })
}
