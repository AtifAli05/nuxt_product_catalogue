import { readBody } from 'h3';
import * as productService from '../services/productService';
import Product from '../models/products';

export async function getAllProducts(event) {
  const products = await productService.getAllProducts();
  return { products };
}

export async function getMyProducts(event) {
  const user = event.context.user;
  const products = await productService.getProductsByUser(user.id);
  return { products };
}

export async function getProductById(event) {
  const id = event.context.params.id;
  const product = await productService.getProductById(id);
  return { product };
}

export async function createProduct(event) {
  try {
    const body = await readBody(event)

    // 🧠 FIX: get user from event.context
    const user = event.context.user
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const productData = {
      ...body,
      ownerId: user.id,  // or whatever key you're using
    }

    const newProduct = await Product.create(productData)

    return {
      success: true,
      data: newProduct,
    }
  } catch (error) {
    console.error('Error in createProduct:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Server Error',
      message: error.message,
    })
  }
}

export async function updateProduct(event) {
  const id = event.context.params.id;
  const user = event.context.user;
  const body = await readBody(event);
  const updated = await productService.updateProduct(id, body, user);
  return { updated };
}

export async function deleteProduct(event) {
  const id = event.context.params.id;
  const user = event.context.user;
  const deleted = await productService.deleteProduct(id, user);
  return { deleted };
}
