// server/api/products/create.post.js

import { createProduct } from "../services/productService";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  console.log("dfvdfvdfvfd22222222222222");
  
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const body = await readBody(event);
  const product = await createProduct(body, user.id);

  return { success: true, product };
});
