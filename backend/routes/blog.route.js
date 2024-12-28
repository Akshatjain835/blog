import express from "express";
import { createblog } from "../controller/blog.controller.js"
import { isAuthenticated, isAutho } from "../middlewares/authuser.js";

const router=express.Router();
router.post('/create',isAuthenticated,isAutho("admin"),createblog);

export default router;