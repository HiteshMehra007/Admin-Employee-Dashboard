import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
    path: "./.env",
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "5mb"}));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("/public"));

app.use(cookieParser());

import authRouter from "./routes/auth.route.js";
import employeeRouter from "./routes/employee.route.js";

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/emp", employeeRouter);

export { app };