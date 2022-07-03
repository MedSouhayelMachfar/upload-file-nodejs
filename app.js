require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes.js");

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/api/v1/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "API docs",
  });
});

app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "Error",
    message: "unhandled route",
  });
});

// Error first middleware
app.use((err, req, res, next) => {
  res.status(400).json({
    status: "Error",
    message: err.message,
  });
});
