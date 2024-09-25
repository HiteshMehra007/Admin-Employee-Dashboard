import { Router } from "express";
import { createEmployeeController, deleteEmployee, editEmployee, getAllEmployees, getEmployeeById } from "../controllers/employee.controller.js";
import { uplaod } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/create", uplaod.single('image'), createEmployeeController);

router.get("/list", getAllEmployees);

router.get("/:id", getEmployeeById);

router.put("/edit/:id", uplaod.single('image'), editEmployee);

router.delete("/delete/:id", deleteEmployee);

export default router;