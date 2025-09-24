import express from 'express';
import { login, logout, register } from '../controller/userregister.js';
import { addcategory, additem, deletecategory } from '../controller/fooditems.js';
import upload from '../middleware.js/multer.js';
import { authmiddleware } from '../middleware.js/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login',login)
router.post('/logout',logout)
router.post('/addcategory',upload.single("coverimage"),addcategory)
router.post('/additem',authmiddleware,upload.single("image"),additem)
router.delete("/deletecategory/:id",deletecategory)
export default router;
