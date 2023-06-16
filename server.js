import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from 'path';

//configuring donenv
dotenv.config();

// rest object
const app = express();

// database config
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')));

// routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

// rest api
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})
// initial setput
// app.get("/", (req, res) => {
//   res.send({
//     message: "Welcome the application",
//   });
// });

// PORT
// process.env is used to access all the stuff from the .env folder
const PORT = process.env.PORT || 8080;

// run listen

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT} ✨ ✨ `.bgCyan.white);
});
