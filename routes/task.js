import express from "express";
import { deleteTask, getMyTasks, newtask, updateTask } from "../controler/task.js";
import {isAuthenticated} from "../controler/middlewares/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated, newtask);
router.get("/mytask", isAuthenticated, getMyTasks);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;
