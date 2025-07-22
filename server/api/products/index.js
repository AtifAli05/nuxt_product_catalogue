import { createRouter, defineEventHandler } from 'h3';

import { createProduct, deleteProduct, getAllProducts, getMyProducts, getProductById, updateProduct } from '../controllers/productController';
import { requireAdmin, requireAuth } from '../middleware/auth';

const router = createRouter();
console.log("dfvfdvfdvfdvfdvfd");

router.get('/getAll', requireAuth, requireAdmin, defineEventHandler(getAllProducts));
router.get('/mine', requireAuth, defineEventHandler(getMyProducts));
router.get('/:id', requireAuth, defineEventHandler(getProductById));
router.post('/', requireAuth, defineEventHandler(createProduct));
router.put('/:id', requireAuth, defineEventHandler(updateProduct));
router.delete('/:id', requireAuth, defineEventHandler(deleteProduct));

export default defineEventHandler((event) => router.handler(event));
