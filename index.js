const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");

//Connect to DB
connectToMongoDB(process.env.MONGODB_URL);

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
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(301, entry.redirectUrl);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
