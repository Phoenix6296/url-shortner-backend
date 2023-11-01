const router = require("express").Router();
const { redirectToActualLink } = require("../controllers/slug");

router.get("/:slug", redirectToActualLink);

module.exports = router;
