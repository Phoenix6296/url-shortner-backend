const router = require("express").Router();
const { generateShortUrl } = require("../controllers/url");

router.post("/", generateShortUrl);

module.exports = router;
