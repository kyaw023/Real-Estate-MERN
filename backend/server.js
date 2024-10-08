const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const listingRoute = require("./routes/listing.route");

const cors = require("cors");
const path = require("path");

const cookieParser = require("cookie-parser");
const AuthMiddleWare = require("./middlewares/AuthMiddleWare");

const app = express();

require("dotenv").config();

// Handle preflight requests for all routes

const corsOptions = {
  origin: "https://real-estate-mern-fe.onrender.com",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", AuthMiddleWare, userRoute);
app.use("/api/listing", AuthMiddleWare, listingRoute);
app.use("/api/auth", authRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});
