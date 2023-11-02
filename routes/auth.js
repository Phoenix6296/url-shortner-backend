const router = require("express").Router();
const { handleSignup, handleLogin } = require("../controllers/auth");

router.post("/signup", handleSignup);
router.post("/login", handleLogin);

module.exports = router;
