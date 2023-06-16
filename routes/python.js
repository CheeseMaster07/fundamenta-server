import express from 'express';
import { exec } from 'child_process'

import { getPython } from '../controllers/python.js'


const router = express.Router();

router.get('/', getPython)



export default router;