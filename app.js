require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes.js");

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "Error",
    message: "undefined route",
  });
});

// Error first midleware
app.use((err, req, res, next) => {
  res.status(400).json({
    status: "Error",
    message: err.message,
  });
});
