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

app.use(cors());

app.use(
  cors({
    origin: "https://real-estate-mern-k19pcs5jg-kyaw023s-projects.vercel.app",
    credentials: true,
  })
);

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

app.use("/api/user", AuthMiddleWare, userRoute);
app.use("/api/listing", AuthMiddleWare, listingRoute);
app.use("/api/auth", authRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "index.html"));
});
