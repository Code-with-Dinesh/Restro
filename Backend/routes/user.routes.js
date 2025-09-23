import express from 'express';
import { login, logout, register } from '../controller/userregister.js';
import { addcategory } from '../controller/fooditems.js';
import upload from '../middleware.js/multer.js';
const router = express.Router();

router.post('/register', register);
router.post('/login',login)
router.post('/logout',logout)
router.post('/addcategory',upload.single("coverimage"),addcategory)
export default router;
