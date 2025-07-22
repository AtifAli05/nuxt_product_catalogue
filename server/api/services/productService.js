import Product from "../models/products";
import { createError } from 'h3';

export async function getAllProducts() {
  return Product.findAll();
}

export async function getProductsByUser(userId) {
  return Product.findAll({ where: { ownerId: userId } }); // ✅ Fixed here
}

export async function getProductById(id) {
  return Product.findByPk(id);
}

export async function createProduct(data) {
  console.log("Creating product in DB:", data); // ✅ Log for debugging
  return Product.create(data);
}

export async function updateProduct(id, updates, user) {
  const product = await Product.findByPk(id);
  if (!product || product.ownerId !== user.id) { // ✅ Fixed here
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }
  return product.update(updates);
}

export async function deleteProduct(id, user) {
  const product = await Product.findByPk(id);
  if (!product || (user.role !== 'admin' && product.ownerId !== user.id)) { // ✅ Fixed here
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }
  return product.destroy();
}
