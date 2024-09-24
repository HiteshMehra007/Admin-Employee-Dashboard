import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
})

connectDB()
.then(() => {
    const Port = process.env.PORT || 8080;
    app.listen(Port, (req, res) => {
        console.log(`Server is listening at PORT: ${Port}`)
    })
})
.catch((error) => {
    console.error(`MongoDB Connection failed in index.js !!!`);
})