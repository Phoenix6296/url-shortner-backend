const URL = require("../models/url");

const generateShortUrl = async (req, res) => {
  try {
    const { nanoid } = await import("nanoid");
    const shortId = nanoid(10);
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Please provide a valid url" });
    }
    await URL.create({
      shortId: shortId,
      redirectUrl: url,
      visitedHistory: [],
    });
    return res.json({ shortId: shortId });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { generateShortUrl };
