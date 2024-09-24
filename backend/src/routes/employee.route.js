import { Router } from "express";
import { createEmployeeController } from "../controllers/employee.controller.js";

const router = Router();

router.post("/create", createEmployeeController);

export default router;