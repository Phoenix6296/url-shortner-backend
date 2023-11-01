const URL = require("../models/url");

const redirectToActualLink = async (req, res) => {
  const slug = req.params.slug;
  const entry = await URL.findOneAndUpdate(
    { slug },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(302, entry.redirectURL);
};

module.exports = { redirectToActualLink };