const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// DB Connection
const connectToMongoDB = require("./connect");
connectToMongoDB();

// Routes
const urlRoute = require("./routes/url");
const slugRoute = require("./routes/slug");
const authRoute = require("./routes/auth");

//Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

//Routes
app.use("/url", urlRoute);
app.use("/", slugRoute);
app.use("/auth", authRoute);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
