import express from "express";
import {  login, register, getMyDetails, logout } from "../controler/user.js";
import {isAuthenticated} from "../controler/middlewares/auth.js";

const router = express.Router();
router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me",isAuthenticated,getMyDetails); 

// router.get("/userid/:id", usersById);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

export default router;  