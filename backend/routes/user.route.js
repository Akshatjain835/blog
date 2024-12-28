import express from "express";
import { login } from "../controller/user.controller.js";
import { register } from "../controller/user.controller.js";
import { logout } from "../controller/user.controller.js";
import { isAuthenticated } from "../middlewares/authuser.js";
import { validateImageFile } from "../middlewares/fileupload.middleware.js";


const router=express.Router();

router.post('/register',validateImageFile,register);  //import { register } from "../controller/user.controller";
router.post('/login',login);
router.get('/logout',isAuthenticated,logout);

export default router;