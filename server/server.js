import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./config/dbConnection.js";
import { globalError } from "./middlewares/globalError.js";
import CustomError from "./utils/customeError.js";
import authRouter from "./routes/user.routes.js";
import foodRouter from "./routes/food.routes.js";
import foodTracking from "./routes/tracking.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;
connectdb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", authRouter);
app.use("/api/v1", foodRouter);
app.use("/api/v1", foodTracking);

app.get("/", (req, res) => {
  res.send("Nutrition Tracking Api");
});

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(globalError);

app.listen(PORT, () => {
  console.log(`server is listening on PORT http://localhost:${PORT}`);
});
