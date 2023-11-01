const router = require("express").Router();
const { generateShortUrl, getAllURLs } = require("../controllers/url");

router.post("/", generateShortUrl);
router.get("/", getAllURLs);

module.exports = router;
