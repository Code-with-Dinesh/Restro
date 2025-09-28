import express from 'express';
import { login, logout, register } from '../controller/userregister.js';
import { addcategory, additem, deletecategory, deleteitem, getcategory, getfooditem, updateitem } from '../controller/fooditems.js';
import upload from '../middleware.js/multer.js';
import { authmiddleware } from '../middleware.js/auth.js';
import { allorders, updatorderstatus } from '../controller/orderadmin.js';
import { addcart, getcart, removecart } from '../controller/usercart.js';
const router = express.Router();

router.post('/register', register);
router.post('/login',login)
router.post('/logout',logout)
router.post('/addcategory',upload.single("coverimage"),addcategory)
router.get("/getcategory",getcategory)
router.get('/getfooditems',getfooditem)
router.post('/additem',upload.single("image"),additem)
router.delete("/deletecategory/:id",authmiddleware,deletecategory)
router.delete("/fooditem/:id",authmiddleware,deleteitem)
router.put("/updteitem/:id",upload.single("image"),updateitem)
router.get("/allorders",allorders)
router.put("/updateorder/:id",updatorderstatus)

// cart api 
router.post('/addcart',authmiddleware,addcart)
router.get("/getcart",authmiddleware,getcart)
router.delete("/removecart/:cartItemId",authmiddleware,removecart)
export default router;
