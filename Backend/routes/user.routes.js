import express from 'express';
import { login, logout, register } from '../controller/userregister.js';
import { addcategory, additem } from '../controller/fooditems.js';
import upload from '../middleware.js/multer.js';
import { authmiddleware } from '../middleware.js/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login',login)
router.post('/logout',logout)
router.post('/addcategory',authmiddleware,upload.single("coverimage"),addcategory)
router.post('/additem',upload.single("image"),additem)
export default router;
