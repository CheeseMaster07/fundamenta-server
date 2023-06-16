import express from 'express';

import { login, register, checkTokenExpired } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.post('/checkTokenExpired', auth, checkTokenExpired)

export default router;