import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/user.route.js";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//connect to database
connectDB();

//routes
app.use("/api/users", router);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
