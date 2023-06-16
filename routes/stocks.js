import express from 'express';

import { getStock, getStocks, likeStock } from '../controllers/stocks.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getStocks)
router.get('/:id', getStock)
router.patch('/:id/likeStock', auth, likeStock)

export default router;