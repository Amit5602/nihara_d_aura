import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getCart, 
  addToCart, 
  replaceCart,
  updateCartItem, 
  removeCartItem, 
  applyCoupon, 
  removeCoupon 
} from '../controllers/cartController.js';

const router = express.Router();

router.use(protect);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/', replaceCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeCartItem);
router.post('/apply-coupon', applyCoupon);
router.delete('/remove-coupon', removeCoupon);

export default router;
