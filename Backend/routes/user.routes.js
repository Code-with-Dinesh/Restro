import express from 'express';
import { login, logout, register } from '../controller/userregister.js';
import { addcategory, additem, deletecategory, deleteitem } from '../controller/fooditems.js';
import upload from '../middleware.js/multer.js';
import { authmiddleware } from '../middleware.js/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login',login)
router.post('/logout',logout)
router.post('/addcategory',authmiddleware,upload.single("coverimage"),addcategory)
router.post('/additem',authmiddleware,upload.single("image"),additem)
router.delete("/deletecategory/:id",authmiddleware,deletecategory)
router.delete("/fooditem/:id",authmiddleware,deleteitem)
export default router;
