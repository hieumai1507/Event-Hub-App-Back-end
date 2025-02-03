const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routers/auth/authRoutes");
const connectDB = require("./src/configs/conectDb");
const errorMiddleHandler = require("./src/midldlewares/errorMiddleware");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
const PORT = 3001;
connectDB();
app.use(errorMiddleHandler);

app.use("/auth", authRoutes);
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`Server running at http://localhost:${PORT}`);
});
