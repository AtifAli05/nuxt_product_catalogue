import { createProduct } from "../controllers/productController";
import { requireAuth } from "../middleware/auth";

export default defineEventHandler(async (event) => {
  await requireAuth(event); // manually run middleware
  return createProduct(event);
});
