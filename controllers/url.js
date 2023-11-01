const URL = require("../models/url");

const generateShortUrl = async (req, res) => {
  try {
    const { nanoid } = await import("nanoid");
    const slug = nanoid(10);
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Please provide a valid url" });
    }
    await URL.create({
      slug: slug,
      redirectURL: url,
      visitHistory: [],
    });
    return res.json({ slug: slug });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllURLs = async (req, res) => {
  try {
    const allURLs = await URL.find({});
    allURLs.sort((a, b) => b.createdAt - a.createdAt);
    return res.json(allURLs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { generateShortUrl, getAllURLs };
