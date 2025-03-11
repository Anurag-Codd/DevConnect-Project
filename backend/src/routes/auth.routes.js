import express from "express";
import {  createAccount, login, userData } from "../controllers/user.js";
import authMiddlware from "../middleware/authorization.js";

const router = express.Router();

router.get("/status",authMiddlware, userData);
router.post("/signup", createAccount);
router.post("/login", login);


export default router